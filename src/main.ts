import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: 'http://127.0.0.1:5173/'
	})
	await app.listen(3210)
}
bootstrap()
