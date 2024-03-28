import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import CONFIG from 'config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserService } from 'src/user/user.service';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: `${CONFIG.SECRET_KEY}`,
      signOptions: { expiresIn: '60d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: "CONFIG",
      useValue: CONFIG
    },
    AuthService, 
    UserService, 
    LocalStrategy, 
    RefreshJwtStrategy,
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
