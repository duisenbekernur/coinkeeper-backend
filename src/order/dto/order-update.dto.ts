import { IsNumber, IsString } from 'class-validator'

export class OrderUpdateDto {
	@IsString()
	comment: string
	@IsString()
	cardName: string

	@IsNumber()
	amount: number
	@IsNumber()
	cardId: number
}
