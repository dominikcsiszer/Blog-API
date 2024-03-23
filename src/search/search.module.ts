import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from '@nestjs/mongoose';
import CONFIG from 'config/config';
import { Blog, BlogSchema } from 'src/blog/blog.schema';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [
    {
      provide: "CONFIG",
      useValue: CONFIG
    },
    SearchService
  ]
})
export class SearchModule {}
