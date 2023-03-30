import { Module } from '@nestjs/common'
import { BankCardService } from './bank-card.service'
import { BankCardController } from './bank-card.controller'
import { PrismaService } from 'src/prisma.service'
import { PrismaClient } from '@prisma/client'

@Module({
	controllers: [BankCardController],
	providers: [BankCardService, PrismaService, PrismaClient]
})
export class BankCardModule {}
