import prisma from '../../lib/prisma.js';
import type { CreateDoubtData } from './doubt.types.js';

export const createDoubtService = async (data: CreateDoubtData) => {
  const { fullName, dob, phoneNumber, gender, questionCategory, questionDescription, location, ipAddress, deviceInfo, requestTime } = data;

  const requestDate = requestTime ? new Date(requestTime) : new Date();

  return await prisma.$transaction(async (tx) => {
    let user = await tx.user.findUnique({ where: { phoneNumber } });

    if (!user) {
      user = await tx.user.create({
        data: {
          phoneNumber,
          fullName: fullName || '',
          dateOfBirth: dob ? new Date(dob) : null,
          gender: gender || null,
          location: location || null,
          createdAt: requestDate,
          updatedAt: requestDate,
        }
      });
    }

    const query = await tx.query.create({
      data: {
        userId: user.id,
        category: questionCategory,
        question: questionDescription,
        answer: '',
        location: location || null,
        ipAddress: ipAddress || null,
        deviceInfo: deviceInfo || null,
        createdAt: requestDate,
        updatedAt: requestDate,
      }
    });

    return { userId: user.id, queryId: query.id };
  });
};

export const getAllDoubtsService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [doubts, total] = await Promise.all([
    prisma.query.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.query.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    doubts,
    total,
    page,
    limit,
    totalPages,
  };
};

export const getDoubtByIdService = async (id: string) => {
  return await prisma.query.findUnique({
    where: { id },
  });
};

export const addAnswerService = async (id: string, answer: string) => {
  return await prisma.query.update({
    where: { id },
    data: { answer },
  });
};