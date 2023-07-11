import { Module } from '@nestjs/common';
import { PostersService } from './posters.service';
import { PostersController } from './posters.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [PostersController],
  providers: [PostersService, PrismaService]
})
export class PostersModule {}
