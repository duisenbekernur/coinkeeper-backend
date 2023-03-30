import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { OrderModule } from './order/order.module'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, OrderModule, AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
