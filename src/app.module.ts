import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';
import CONFIG from 'config/config';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.MONGODB_CONNECTION_URI),
    BlogModule,
    SearchModule
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
