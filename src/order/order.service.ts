import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async addOrder(userId: number, comment: string) {
		const order = await this.prisma.order.create({
			data: {
				comment: comment,
				userId: userId
			}
		})
	}

	async getAll(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
