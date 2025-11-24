import type { Request, Response } from 'express';
import { createDoubtService, getAllDoubtsService, getDoubtByIdService, addAnswerService } from './doubt.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createDoubtController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, dob, phoneNumber, gender, questionCategory, questionDescription, location } = req.body;

  if (!phoneNumber || !questionCategory || !questionDescription) {
    throw new ApiError(400, 'Missing required fields: phoneNumber, questionCategory, questionDescription');
  }

  const result = await createDoubtService({
    fullName,
    dob,
    phoneNumber,
    gender,
    questionCategory,
    questionDescription,
    location,
    ipAddress: req.ip || null,
    deviceInfo: req.get('User-Agent') || null,
    requestTime: req.headers['x-timestamp'] as string,
  });

  res.status(201).json(new ApiResponse(201, { userId: result.userId, queryId: result.queryId }, 'Question submitted successfully'));
});

export const getAllDoubtsController = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = await getAllDoubtsService(page, limit);

  res.status(200).json(new ApiResponse(200, result));
});

export const getDoubtByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, 'ID is required');
  }

  const doubt = await getDoubtByIdService(id);

  if (!doubt) {
    throw new ApiError(404, 'Doubt not found');
  }

  res.status(200).json(new ApiResponse(200, doubt));
});

export const addAnswerController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { answer } = req.body;

  if (!id) {
    throw new ApiError(400, 'ID is required');
  }

  if (!answer) {
    throw new ApiError(400, 'Answer is required');
  }

  const doubt = await addAnswerService(id, answer);

  res.status(200).json(new ApiResponse(200, doubt, 'Answer added successfully'));
});