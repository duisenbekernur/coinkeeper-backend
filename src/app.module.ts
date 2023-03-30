import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrderModule } from './order/order.module'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BankCardModule } from './bank-card/bank-card.module';

@Module({
	imports: [UserModule, OrderModule, AuthModule, CategoryModule, BankCardModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
