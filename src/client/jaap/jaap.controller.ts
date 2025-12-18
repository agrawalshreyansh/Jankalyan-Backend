import type { Request, Response } from 'express';
import { increaseJaapCountService } from './jaap.service.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const increaseJaapCountController = asyncHandler(async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId as string;

  const { name, phone, city } = req.body;

  const identifier = phone || deviceId;
  const isPhone = !!phone;

  if (!identifier) {
    throw new Error('Phone or Device ID is required');
  }

  const requestTime = req.headers['x-timestamp'] as string

  const result = await increaseJaapCountService(
    identifier,
    isPhone,
    deviceId,
    name || undefined,
    city || undefined,
    req.body.location || undefined,
    req.ip || undefined,
    req.get('User-Agent') || undefined,
    requestTime
  );

  res.status(200).json(new ApiResponse(200, result, 'Jaap count increased successfully'));
});

export const getJaapImages = asyncHandler(async (req: Request, res: Response) => {
    const images = [
    { id: 'radha', label: 'Radha Krishna', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067240/1_ylkbnu.png' } },
    { id: 'shiv', label: 'Shiv', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067240/3_xo4urq.png' } },
    { id: 'ram', label: 'Ram', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067241/5_jztgux.png' } },
    { id: 'ram2', label: 'Ram', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067241/8_jdkzkw.png' } },
    { id: 'radha2', label: 'Radha Krishna', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067240/4_w6bbbs.png' } },
    { id: 'shiv2', label: 'Shiv', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067242/7_cfia5l.png' } },
    { id: 'ram3', label: 'Ram', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067241/6_bxn8te.png' } },
    { id: 'ram4', label: 'Ram', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067240/2_zgwgcf.png' } },
    { id: 'ram7', label: 'Ram', source: { uri: 'https://res.cloudinary.com/dybtwwjvi/image/upload/v1766067243/9_lnp1wo.png' } },
    { id: 'ram8', label: 'Ram', source: { uri: '' } }
  ];
    res.status(200).json(new ApiResponse(200, images, 'Jaap images retrieved successfully'));
}); 