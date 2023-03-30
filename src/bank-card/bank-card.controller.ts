import { Controller, Post } from '@nestjs/common'
import { Body, Delete, Get, Param, Put } from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { BankCardDto } from './dto/bank-card.dto'
import { BankCardService } from './bank-card.service'
import { BankCardChangeBalanceDto } from './dto/bank-card-change-balance.dto'

@Controller('bank-card')
export class BankCardController {
	constructor(private readonly bankCardService: BankCardService) {}

	@Auth()
	@Get()
	async getAllCards(@CurrentUser('id') userId: number) {
		return this.bankCardService.getAllCards(userId)
	}

	@Auth()
	@Post()
	async addCard(@CurrentUser('id') userId: number, @Body() dto: BankCardDto) {
		return this.bankCardService.addCard(userId, dto)
	}

	@Auth()
	@Put(':cardId')
	async changeCardBalance(
		@Param('cardId') cardId: string,
		@Body() dto: BankCardChangeBalanceDto
	) {
		return this.bankCardService.changeCardBalance(+cardId, dto)
	}

	@Auth()
	@Delete(':cardId')
	async deleteCard(@Param('cardId') cardId: number) {
		return this.bankCardService.deleteCard(+cardId)
	}
}
