import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { QuranLSUserServices } from './quran-LS.service';

const createQuranLSUser = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.body;

  const result = await QuranLSUserServices.createQuranLSUserIntoDb(userInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registration successfully done',
    data: result,
  });
});

const getAllQuranLSUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLSUserServices.getQuranLSUsersFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: result,
  });
});

const updateQuranLSUser = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const result = await QuranLSUserServices.updateQuranLSUsersIntoDb(
    studentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

const deleteQuranLSUser = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await QuranLSUserServices.deleteQuranLSUserIntoDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

// const makePDFQuranLSUser = catchAsync(async (req: Request, res: Response) => {
//   await QuranLSUserServices.makePdfQuranLSUsersFromDb(res);
// });

export const QuranLSUserControllers = {
  createQuranLSUser,
  getAllQuranLSUsers,
  updateQuranLSUser,
  deleteQuranLSUser,
};
