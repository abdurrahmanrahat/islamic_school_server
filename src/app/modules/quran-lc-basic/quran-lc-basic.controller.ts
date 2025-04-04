import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { QuranLCBasicServices } from './quran-lc-basic.service';

const createQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.createQuranLCBasicIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student registered Quran LC Basic successfully',
    data: result,
  });
});

const getAllQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.getQuranLCBasicsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
});

const getSingleQuranLCBasic = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const result =
      await QuranLCBasicServices.getSingleQuranLCBasicFromDb(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student details retrieved successfully',
      data: result,
    });
  },
);

const updateQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.updateQuranLCBasicIntoDb(
    req.params.studentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student details updated successfully',
    data: result,
  });
});

const deleteQuranLCBasic = catchAsync(async (req: Request, res: Response) => {
  const result = await QuranLCBasicServices.deleteQuranLCBasicIntoDb(
    req.params.studentId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student removed successfully',
    data: result,
  });
});

export const QuranLCBasicControllers = {
  createQuranLCBasic,
  getAllQuranLCBasic,
  getSingleQuranLCBasic,
  updateQuranLCBasic,
  deleteQuranLCBasic,
};
