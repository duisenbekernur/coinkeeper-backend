import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { PrismaService } from 'src/prisma.service'
import { BankCardService } from 'src/bank-card/bank-card.service'
import { PrismaClient } from '@prisma/client'
import { CategoryService } from 'src/category/category.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService, BankCardService, PrismaClient, CategoryService]
})
export class OrderModule {}
