import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Auth()
	@Post()
	async addCategory(
		@CurrentUser('id') userId: number,
		@Body() dto: CategoryDto
	) {
		return this.categoryService.addCategory(userId, dto)
	}

	@Auth()
	@Get()
	async getCategories(@CurrentUser('id') userId: number) {
		return this.categoryService.getCategories(userId)
	}

	@Auth()
	@Delete(':id')
	async deleteCategory(@Param('id') id: string) {
		return this.categoryService.deleteCategory(+id)
	}
}
