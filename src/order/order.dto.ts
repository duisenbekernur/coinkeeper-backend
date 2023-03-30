import { IsNumber, IsString } from 'class-validator'

export class OrderDto {
	@IsString()
	comment: string

	@IsNumber()
	userId: number
}
