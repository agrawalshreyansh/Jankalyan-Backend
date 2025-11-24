import prisma from '../../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { CreateAdminUserData, AddAdminUserData, RegisterAdminData, LoginAdminData } from './adminUser.types.js';

export const createAdminUserService = async (data: CreateAdminUserData) => {
  const { email, password, fullName, role, addedBy } = data;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  return await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      fullName: fullName || null,
      role,
      addedBy: addedBy || null,
    },
  });
};

export const addAdminUserService = async (data: AddAdminUserData) => {
  const { email, role, addedBy } = data;

  return await prisma.adminUser.create({
    data: {
      email,
      role,
      addedBy: addedBy || null,
    },
  });
};

export const registerAdminService = async (data: RegisterAdminData) => {
  const { email, password, fullName } = data;

  // Check if admin user exists and has no password set
  const existingUser = await prisma.adminUser.findUnique({ where: { email } });

  if (!existingUser) {
    throw new Error('Admin user not found');
  }

  if (existingUser.password) {
    throw new Error('Admin user already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.adminUser.update({
    where: { email },
    data: {
      password: hashedPassword,
      fullName,
    },
  });
};

export const getAllAdminUsersService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [adminUsers, total] = await Promise.all([
    prisma.adminUser.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.adminUser.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    adminUsers,
    total,
    page,
    limit,
    totalPages,
  };
};

export const getAdminUserByIdService = async (id: string) => {
  return await prisma.adminUser.findUnique({
    where: { id },
  });
};

export const loginAdminService = async (data: LoginAdminData) => {
  const { email, password } = data;

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken, user };
};

export const refreshAccessTokenService = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'default_refresh_secret') as { userId: string };

    const user = await prisma.adminUser.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '15m' }
    );

    return { accessToken: newAccessToken, user };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};