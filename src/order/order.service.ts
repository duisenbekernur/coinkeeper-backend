import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async addOrder(userId: number, dto: OrderDto) {
		const currentCard = await this.prisma.bankCard.findFirst({
			where: { id: dto.cardId },
			select: { balance: true }
		})

		const bankCard = await this.prisma.bankCard.update({
			where: { id: dto.cardId },
			data: {
				balance: currentCard.balance - dto.amount
			}
		})

		const order = await this.prisma.order.create({
			data: {
				comment: dto.comment,
				amount: dto.amount,
				cardName: dto.cardName,
				cardId: dto.cardId,
				categories: dto.categoryIds,
				userId
			},
			select: {
				id: true,
				comment: true,
				cardName: true,
				amount: true
			}
		})

		return { message: 'Successfully', bankCard, order }
	}

	async getAll(userId: number) {
		const orders = await this.prisma.order.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				cardName: true,
				amount: true,
				comment: true,
				categories: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return orders
	}
}
