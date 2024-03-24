import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from 'config/config';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [ 
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
    UserService
  ]
})
export class UserModule {}
