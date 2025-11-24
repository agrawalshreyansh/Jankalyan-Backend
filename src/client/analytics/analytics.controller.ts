import type { Request, Response } from 'express';
import { getAnalyticsService } from './analytics.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const getAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  const analytics = await getAnalyticsService();
  res.status(200).json(new ApiResponse(200, analytics));
});