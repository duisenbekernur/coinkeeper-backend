import { IsNumber, IsString } from 'class-validator'

export class BankCardDto {
	@IsString()
	name: string

	@IsNumber()
	balance: number
}
