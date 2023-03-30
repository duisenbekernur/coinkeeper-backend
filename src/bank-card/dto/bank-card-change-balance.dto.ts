import { IsNumber } from 'class-validator'

export class BankCardChangeBalanceDto {
	@IsNumber()
	balance: number
}
