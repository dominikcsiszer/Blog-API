import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from '../../config/config';
import { Blog, BlogSchema } from './blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [
      MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
      MongooseModule.forFeature([
        { name: Blog.name, schema: BlogSchema },
      ]),
    ],
    providers: [
        {
          provide: "CONFIG",
          useValue: CONFIG
        },
        BlogService
    ],
    controllers: [BlogController],
})
export class BlogModule {}
