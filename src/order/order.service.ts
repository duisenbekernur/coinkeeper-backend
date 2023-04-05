import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './dto/order.dto'
import { OrderUpdateDto } from './dto/order-update.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async addOrder(userId: number, dto: OrderDto) {
		const currentCard = await this.prisma.bankCard.findFirst({
			where: { id: dto.cardId },
			select: { balance: true }
		})

		if (currentCard.balance - dto.amount < 0) {
			return { message: "Card doesn't have enough money" }
		}

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
				amount: true,
				createdAt: true
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
				categories: true,
				cardId: true,
				createdAt: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return orders
	}

	async deleteOrder(id: number, cardId: number) {
		const prevOrder = await this.prisma.order.findUnique({
			where: { id },
			select: { amount: true }
		})

		const prevCard = await this.prisma.bankCard.findUnique({
			where: { id: cardId },
			select: { balance: true }
		})

		const card = await this.prisma.bankCard.update({
			where: { id: cardId },
			data: {
				balance: prevCard.balance + prevOrder.amount
			}
		})

		const order = await this.prisma.order.delete({
			where: { id }
		})

		return { message: 'SUCCESS' }
	}

	async updateOrder(id: number, dto: OrderUpdateDto) {
		const prevOrder = await this.prisma.order.findFirst({
			where: { id },
			select: {
				amount: true
			}
		})

		const prevBankCard = await this.prisma.bankCard.findUnique({
			where: { id: dto.cardId },
			select: { balance: true }
		})

		const order = await this.prisma.order.update({
			where: { id },
			data: {
				amount: dto.amount,
				cardId: dto.cardId,
				cardName: dto.cardName,
				comment: dto.comment
			}
		})

		const bankCard = await this.prisma.bankCard.update({
			where: {
				id: dto.cardId
			},
			data: {
				balance: prevBankCard.balance + prevOrder.amount - order.amount
			}
		})

		return order
	}
}
