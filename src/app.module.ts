import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import CONFIG from 'config/config';
import mongoose from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: CONFIG.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
    BlogModule,
    SearchModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: "CONFIG",
      useValue: CONFIG
    },
    AppService
  ],
})
export class AppModule {
  constructor() {
    // Enable debug mode for Mongoose
    mongoose.set('debug', true);
  }
}
