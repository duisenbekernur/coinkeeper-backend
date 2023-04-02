import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { BankCardChangeBalanceDto } from './dto/bank-card-change-balance.dto'
import { BankCardDto } from './dto/bank-card.dto'

@Injectable()
export class BankCardService {
	constructor(private prisma: PrismaClient) {}

	async getAllCards(userId: number) {
		const cards = await this.prisma.bankCard.findMany({
			where: { userId },
			select: {
				id: true,
				name: true,
				balance: true,
				number: true,
				csv: true,
				expiry: true,
				valid: true
			}
		})

		return cards
	}

	async addCard(userId: number, dto: BankCardDto) {
		const card = await this.prisma.bankCard.create({
			data: {
				userId,
				name: dto.name,
				balance: dto.balance,
				number: dto.number,
				csv: dto.csv,
				expiry: dto.expiry,
				valid: dto.valid
			},
			select: {
				name: true,
				balance: true,
				id: true,
				number: true,
				csv: true,
				expiry: true,
				valid: true
			}
		})

		return card
	}

	async changeCardBalance(cardId: number, dto: BankCardChangeBalanceDto) {
		const card = await this.prisma.bankCard.update({
			where: { id: cardId },
			data: {
				balance: dto.balance
			},
			select: {
				name: true,
				balance: true,
				id: true,
				number: true,
				csv: true,
				expiry: true,
				valid: true
			}
		})

		return card
	}

	async deleteCard(cardId: number) {
		return await this.prisma.bankCard.delete({
			where: { id: cardId }
		})
	}
}
