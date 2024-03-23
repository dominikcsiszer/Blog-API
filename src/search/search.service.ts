import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from 'src/blog/blog.schema';
import { Status } from 'src/blog/blog.types';

@Injectable()
export class SearchService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async searchBlogs(sort: string, limit: number): Promise<BlogDocument[]> {
        let query = this.blogModel.find({ status: Status.PUBLISHED });
      
        // Apply sorting if sort parameter is provided
        if (sort === 'asc') {
          query = query.sort({ createdAt: 1 });
        } else if (sort === 'desc') {
          query = query.sort({ createdAt: -1 });
        }
      
        // Apply limit if limit parameter is provided
        if (limit) {
          query = query.limit(limit);
        }
      
        return query.exec();
    }

    async searchBlogsByField(field: string, query: string): Promise<BlogDocument[]> {
        // Construct the query object to filter by the specified field and search query
        const queryObject = {};
        queryObject[field] = { $regex: query, $options: 'i' }; // Case-insensitive regex search
    
        // Search only for published blogs
        queryObject['status'] = 'published';
    
        // Execute the query
        return this.blogModel.find(queryObject).exec();
    }

    async getPopularBlogs(limit?: number): Promise<BlogDocument[]> {
        // Query to find popular blogs sorted by viewCount in descending order
        let query = this.blogModel.find({ status: 'published' }).sort({ 'metadata.viewCount': -1 });
    
        // Apply limit if provided
        if (limit) {
          query = query.limit(limit);
        }
    
        return query.exec();
    }
}
