import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
const global_any: any = global;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global_any.prisma) {
    global_any.prisma = new PrismaClient()
  }
  prisma = global_any.prisma
}

export default prisma