// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` in development to prevent exhausting connections
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

// In development, use the global so we only create one instance
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
