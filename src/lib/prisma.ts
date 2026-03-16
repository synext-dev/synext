// Phase 2: uncomment and configure with your database adapter
// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
//
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
//
// const adapter = new PrismaPg(process.env.DATABASE_URL!);
// export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Phase 1: Prisma client stub — not used, all data comes from mock-data.ts via services
export const prisma = null;
