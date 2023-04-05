import { IsNumber, IsString } from 'class-validator'

export class OrderDto {
	@IsString()
	comment: string
	@IsString()
	cardName: string

	@IsNumber()
	amount: number
	@IsNumber()
	cardId: number

	@IsNumber({}, { each: true })
	categoryIds: number[]
}
