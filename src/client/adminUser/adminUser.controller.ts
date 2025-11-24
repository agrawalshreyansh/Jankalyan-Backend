import type { Request, Response } from 'express';
import { createAdminUserService, getAllAdminUsersService, getAdminUserByIdService, addAdminUserService, registerAdminService, loginAdminService, refreshAccessTokenService } from './adminUser.service.js';
import type { CreateAdminUserData, AddAdminUserData, RegisterAdminData, LoginAdminData } from './adminUser.types.js';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';


export const addAdminUserController = asyncHandler(async (req: Request, res: Response) => {
    const { email, role, addedBy } = req.body;

    if (!email || !role) {
        throw new ApiError(400, 'Missing required fields: email, role');
    }

    const adminUser = await addAdminUserService({
        email,
        role,
        addedBy,
    });

    res.status(201).json(new ApiResponse(201, adminUser, 'Admin permission granted successfully'));
});

export const registerAdminController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        throw new ApiError(400, 'Missing required fields: email, password, fullName');
    }

    const adminUser = await registerAdminService({
        email,
        password,
        fullName,
    });

    res.status(201).json(new ApiResponse(201, adminUser, 'Admin registered successfully'));
});

export const loginAdminController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Missing required fields: email, password');
    }

    const { accessToken, refreshToken, user } = await loginAdminService({
        email,
        password,
    });

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    });

    res.status(200).json(new ApiResponse(200, { id: user.id, email: user.email, role: user.role }, 'Login successful'));
});

export const getAllAdminUsersController = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getAllAdminUsersService(page, limit);

    res.status(200).json(new ApiResponse(200, result));
});

export const getAdminUserByIdController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, 'ID is required');
    }

    const adminUser = await getAdminUserByIdService(id);

    if (!adminUser) {
        throw new ApiError(404, 'Admin user not found');
    }

    res.status(200).json(new ApiResponse(200, adminUser));
});

export const refreshAccessTokenController = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError(401, 'Refresh token is required');
    }

    const { accessToken, user } = await refreshAccessTokenService(refreshToken);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json(new ApiResponse(200, { id: user.id, email: user.email, role: user.role }, 'Access token refreshed successfully'));
});