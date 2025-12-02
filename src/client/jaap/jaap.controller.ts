import type { Request, Response } from 'express';
import { increaseJaapCountService, getTotalJaapCountService } from './jaap.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const increaseJaapCountController = asyncHandler(async (req: Request, res: Response) => {
  const { deviceID } = req.params;

  console.log('Device ID:', deviceID);

  if (!deviceID) {
    throw new Error('Device ID is required');
  }

    const requestTime = req.headers['x-timestamp'] as string

  const result = await increaseJaapCountService(
    deviceID,
    req.body.location || undefined,
    req.ip || undefined,
    req.get('User-Agent') || undefined,
    requestTime
  );

  res.status(200).json(new ApiResponse(200, result, 'Jaap count increased successfully'));
});

export const getTotalJaapCountController = asyncHandler(async (req: Request, res: Response) => {
  const result = await getTotalJaapCountService();

  res.status(200).json(new ApiResponse(200, result, 'Total jaap count retrieved successfully'));
});