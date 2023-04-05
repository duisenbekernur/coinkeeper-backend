import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { OrderService } from './order.service'
import { OrderDto } from './dto/order.dto'
import { OrderUpdateDto } from './dto/order-update.dto'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@Auth()
	addOrder(@CurrentUser('id') userId: number, @Body() dto: OrderDto) {
		return this.orderService.addOrder(userId, dto)
	}

	@Get()
	@Auth()
	getAll(@CurrentUser('id') userId: number) {
		return this.orderService.getAll(userId)
	}

	@Delete(':orderId')
	@Auth()
	deleteOrder(@Param('orderId') orderId: string, @Body() dto) {
		return this.orderService.deleteOrder(+orderId, dto.cardId)
	}

	@Put(':orderId')
	@Auth()
	updateOrder(@Param('orderId') orderId: string, @Body() dto: OrderUpdateDto) {
		return this.orderService.updateOrder(+orderId, dto)
	}
}
