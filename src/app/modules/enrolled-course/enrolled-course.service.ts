import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { convertBengaliToEnglishNumber } from '../../utils/conversion';
import { TCourse } from '../course/course.interface';
import { Course } from '../course/course.model';
import { enrolledCourseSearchableFields } from './enrolled-course.constant';
import { TEnrolledCourse } from './enrolled-course.interface';
import { EnrolledCourse } from './enrolled-course.model';

const createEnrolledCourseIntoDb = async (payload: TEnrolledCourse) => {
  const course = await Course.findOne({ _id: payload.course });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');
  }

  const isAlreadyEnrolled = await EnrolledCourse.findOne({
    user: payload.user,
    course: payload.course,
    isDeleted: false,
  });

  if (isAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'You have already enrolled in the course!',
    );
  }

  const session = await EnrolledCourse.startSession();

  try {
    session.startTransaction();

    const enrolledCourse = await EnrolledCourse.create([payload], { session });

    const enrolledCourseCount = await EnrolledCourse.countDocuments({
      course: course._id,
      isDeleted: false,
    }).session(session);

    await Course.updateOne(
      { _id: course._id },
      { totalEnrolledStudents: enrolledCourseCount },
      { session },
    );

    await session.commitTransaction();

    return enrolledCourse[0];
  } catch (error) {
    await session.abortTransaction();
  }

  session.endSession();
};

const getEnrolledCoursesFromDb = async (
  courseType: string | undefined,
  restQuery: Record<string, unknown>,
) => {
  const enrolledQuery = new QueryBuilder(
    EnrolledCourse.find({ isDeleted: false }),
    restQuery,
  )
    .search(enrolledCourseSearchableFields)
    .filter();
  // .pagination();

  // Apply populate with match for courseType
  const dataWithCourseMatch = await enrolledQuery.modelQuery
    .sort({ createdAt: -1 })
    .populate({
      path: 'user',
      match: { isDeleted: false },
      select: '-password',
    })
    .populate({
      path: 'course',
      match: {
        ...(courseType ? { courseType } : {}),
        isDeleted: false, // ✅ Ensures soft-deleted courses are excluded
      },
      populate: {
        path: 'courseInstructors',
        select: 'name details',
      },
    });

  // Remove items where course doesn't match (filtered out during populate)
  const filteredData = dataWithCourseMatch.filter((doc) => doc.course !== null);

  // Recalculate total count based on filtered results
  const totalCount = filteredData.length;

  return { data: filteredData, totalCount };
};

const getEnrolledCoursesByEmailFromDb = async (
  studentEmail: string,
  courseType: string | undefined,
  query: Record<string, unknown>,
) => {
  const enrolledQuery = new QueryBuilder(
    EnrolledCourse.find({ isDeleted: false }),
    query,
  )
    .search(enrolledCourseSearchableFields)
    .filter();

  const populatedData = await enrolledQuery.modelQuery
    .sort({ createdAt: -1 })
    .populate({
      path: 'user',
      match: { email: studentEmail, isDeleted: false },
      select: '-password',
    })
    .populate({
      path: 'course',
      match: {
        ...(courseType ? { courseType } : {}),
        isDeleted: false, // ✅ Ensures soft-deleted courses are excluded
      },
      populate: {
        path: 'courseInstructors',
        select: 'name details',
      },
    });

  const filteredData = populatedData.filter(
    (item) => item.user !== null && item.course !== null,
  );

  const enrolledQueryWithoutPagination = new QueryBuilder(
    EnrolledCourse.find({ isDeleted: false }),
    query,
  )
    .search(enrolledCourseSearchableFields)
    .filter();

  const rawUnpaginatedData = await enrolledQueryWithoutPagination.modelQuery
    .populate({
      path: 'user',
      match: { email: studentEmail },
      select: '-password',
    })
    .populate({
      path: 'course',
      match: courseType ? { courseType } : {},
    });

  const filteredCount = rawUnpaginatedData.filter(
    (item) => item.user !== null && item.course !== null,
  ).length;

  return {
    data: filteredData,
    totalCount: filteredCount,
  };
};

const getSingleEnrolledCourseFromDb = async (enrolledCourseId: string) => {
  const result = await EnrolledCourse.findOne({
    _id: enrolledCourseId,
    isDeleted: false,
  })
    .populate({
      path: 'user',
      select: '-password', // exclude password
    })
    .populate({
      path: 'course',
      populate: {
        path: 'courseInstructors',
        select: 'name details', // select specific fields from user
      },
    });
  return result;
};

const updateEnrolledCourseIntoDb = async (
  enrolledCourseId: string,
  body: Partial<TEnrolledCourse>,
) => {
  const result = await EnrolledCourse.findOneAndUpdate(
    { _id: enrolledCourseId, isDeleted: false },
    body,
    { new: true },
  );
  return result;
};

const deleteEnrolledCourseFromDb = async (enrolledCourseId: string) => {
  const session = await EnrolledCourse.startSession();

  try {
    session.startTransaction();

    // Step 1: Find the enrolled course to get the course ID
    const enrolledCourse =
      await EnrolledCourse.findById(enrolledCourseId).session(session);

    if (!enrolledCourse) {
      throw new AppError(httpStatus.NOT_FOUND, 'Enrolled course not found!');
    }

    // Step 2: Delete the enrolled course
    await EnrolledCourse.findByIdAndUpdate(
      enrolledCourseId,
      { isDeleted: true },
      { session },
    );

    // Step 3: Recalculate total enrolled students for the course
    const enrolledCourseCount = await EnrolledCourse.countDocuments({
      course: enrolledCourse.course,
      isDeleted: false,
    }).session(session);

    await Course.updateOne(
      { _id: enrolledCourse.course },
      { totalEnrolledStudents: enrolledCourseCount },
      { session },
    );

    await session.commitTransaction();

    return enrolledCourse;
  } catch (error) {
    await session.abortTransaction();
  }

  session.endSession();
};

const enrolledLiveCourseStatusPropertiesUpdateIntoDb = async (
  enrolledCourseId: string,
  amount: number,
  paymentID: string,
) => {
  // Step 1: Fetch the course
  const enrolledCourse = await EnrolledCourse.findById(
    enrolledCourseId,
  ).populate<{ course: TCourse }>('course');

  if (!enrolledCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enrolled course not found!');
  }

  // step 2: course price
  const coursePrice = Number(
    convertBengaliToEnglishNumber(enrolledCourse?.course?.coursePrice || '০'),
  );

  const existingPaid = Number(enrolledCourse.totalCourseFeePaid || 0);
  const newTotalPaid = existingPaid + amount;

  const isFullyPaid = newTotalPaid >= coursePrice;

  // Step 3: Push new history entry
  const newHistory = [
    ...(enrolledCourse.courseFeeHistory || []),
    {
      amount,
      date: new Date().toISOString(),
      paymentID,
    },
  ];

  // Step 4: Update DB
  const result = await EnrolledCourse.findByIdAndUpdate(
    enrolledCourseId,
    {
      totalCourseFeePaid: newTotalPaid,
      paymentStatus: isFullyPaid ? 'completed' : 'in-progress',
      courseFeeHistory: newHistory,
    },
    { new: true },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDb,
  getEnrolledCoursesFromDb,
  getEnrolledCoursesByEmailFromDb,
  getSingleEnrolledCourseFromDb,
  updateEnrolledCourseIntoDb,
  deleteEnrolledCourseFromDb,
  enrolledLiveCourseStatusPropertiesUpdateIntoDb,
};
