import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { FaqServices } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const faqData = req.body;

  const result = await FaqServices.createFaqIntoDb(faqData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqServices.getFaqsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All FAQs retrieved successfully',
    data: result,
  });
});

const getSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;

  const result = await FaqServices.getSingleFaqFromDb(faqId);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single FAQ retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'FAQ not found!',
      data: result,
    });
  }
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;

  const result = await FaqServices.updateFaqIntoDb(faqId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params;

  const result = await FaqServices.deleteFaqIntoDb(faqId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FAQ deleted successfully',
    data: result,
  });
});

export const FaqControllers = {
  createFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
