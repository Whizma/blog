import type { PrismaClient } from '@prisma/client'

export interface Locals {
  user?: {
    name: string
    role: string
  }
  prisma: PrismaClient
}
