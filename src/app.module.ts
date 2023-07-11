import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PostersModule } from './posters/posters.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }), 
    AuthModule, 
    PostersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
