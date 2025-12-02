import type { Request, Response } from 'express';
import { getAnalyticsService } from './analytics.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const analytics = await getAnalyticsService();
    res.status(200).json(new ApiResponse(200, analytics));
  } catch (error) {
    throw new ApiError(500, 'Failed to fetch analytics');
  }
});