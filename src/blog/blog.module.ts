import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from '../../config/config';
import { Blog, BlogSchema } from './blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
    imports: [
      MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
      MongooseModule.forFeature([
        { name: Blog.name, schema: BlogSchema },
      ]),
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
      ]),
    ],
    providers: [
        {
          provide: "CONFIG",
          useValue: CONFIG
        },
        BlogService,
        UserService
    ],
    controllers: [BlogController],
})
export class BlogModule {}
