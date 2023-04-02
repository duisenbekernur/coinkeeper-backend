import { IsNumber, IsString } from 'class-validator'

export class BankCardDto {
	@IsString()
	name: string
	@IsString()
	valid: string
	@IsString()
	expiry: string

	@IsNumber()
	balance: number
	@IsNumber()
	number: string
	@IsNumber()
	csv: number
}
