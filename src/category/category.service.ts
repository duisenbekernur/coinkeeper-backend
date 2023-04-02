import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async addCategory(userId: number, dto: CategoryDto) {
		const category = await this.prisma.category.create({
			data: {
				name: dto.name,
				userId
			},
			select: {
				id: true,
				name: true
			}
		})

		return { category, message: 'Successfully created' }
	}

	async getCategories(userId: number) {
		const categories = await this.prisma.category.findMany({
			where: { userId },
			select: {
				name: true,
				id: true
			}
		})

		return categories
	}

	async deleteCategory(id: number) {
		const category = await this.prisma.category.delete({ where: { id } })

		return { message: 'Succesfully deleted' }
	}
}
