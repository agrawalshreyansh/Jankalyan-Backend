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
    { id: 'radha', label: 'Radha Krishna', source: { uri: 'https://play-lh.googleusercontent.com/5EMx0bKVFP8BA2u5Jy1VOZlA28Hdpo7okVbjXXrDx3uDLQCVeoaaWdLEL1CSTqKojw' } },
    { id: 'shiv', label: 'Shiv', source: { uri: 'https://www.stickitup.xyz/cdn/shop/files/2_a3d7a4d1-f641-4308-aab5-1ff1848d5961.jpg?v=1741858114&width=1000' } },
    { id: 'ram', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } },
    { id: 'ram2', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } },
    { id: 'radha2', label: 'Radha Krishna', source: { uri: 'https://play-lh.googleusercontent.com/5EMx0bKVFP8BA2u5Jy1VOZlA28Hdpo7okVbjXXrDx3uDLQCVeoaaWdLEL1CSTqKojw' } },
    { id: 'shiv2', label: 'Shiv', source: { uri: 'https://www.stickitup.xyz/cdn/shop/files/2_a3d7a4d1-f641-4308-aab5-1ff1848d5961.jpg?v=1741858114&width=1000' } },
    { id: 'ram3', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } },
    { id: 'ram4', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } },
    { id: 'ram7', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } },
    { id: 'ram8', label: 'Ram', source: { uri: 'https://www.shutterstock.com/shutterstock/photos/2404319055/display_1500/stock-vector-ram-ram-in-hindi-praising-lord-ram-hindi-calligraphy-typography-hindu-greeting-jai-shree-ram-2404319055.jpg' } }
  ];
    res.status(200).json(new ApiResponse(200, images, 'Jaap images retrieved successfully'));
}); 