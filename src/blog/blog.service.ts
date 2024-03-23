import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './blog.types';
import { slugify } from 'src/utils/slug';
import { BlogDTO } from './blog.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async createBlog(params: BlogDTO): Promise<BlogDocument> {
        try {
            const slug = slugify(params.title); // Generate a slug from the title
            const newBlog = new this.blogModel({ 
                ...params, 
                slug, 
                status: Status.DRAFT
            }); // Create a new blog object
            return await newBlog.save(); // Return the saved blog
          } catch (error) {
            console.error(error);
            throw new Error(`Error creating blog: Please try again. ${error.message}`);
          }
    }
    

    async getBlogs(): Promise<BlogDocument[]> {
        // Get blogs only the status is PUBLISHED
        return await this.blogModel.find({ status: Status.PUBLISHED }).exec();
    }

    async getBlogById(id: string): Promise<BlogDocument> {
        return await this.blogModel.findOne({ _id: id }).exec();
    }

    async updateBlogById(id: string, params: Partial<Blog>): Promise<BlogDocument> {
        const blog = await this.getBlogById(id)
        if(!blog) {
            throw new NotFoundException(`Blog with Identifier ${id} not found`)
        }

        if(params.title) {
            params.slug = slugify(params.title)
        }

        Object.assign(blog, {
            ...params,
            updatedAt: new Date(),
        })

        return await blog.save();
    }

    async deleteBlogById(id: string): Promise<BlogDocument> {
        const blog = await this.getBlogById(id)
        if(!blog) {
            throw new NotFoundException(`Blog with Identifier ${id} not found`)
        }

        return this.updateBlogById(id, { status: Status.ARCHIVED })
    }

    async addViewToBlog(id: string): Promise<void> {
        await this.blogModel.updateOne(
            { _id: id }, 
            { $inc: { 'metadata.viewCount': 1 } },
            { upsert: true }
        );
    }

    async addLikeToBlog(id: string): Promise<void> {
        await this.blogModel.updateOne(
            { _id: id }, 
            { $inc: { 'metadata.likeCount': 1 } },
            { upsert: true }
        );
    }

    async addShareToBlog(id: string): Promise<void> {
        await this.blogModel.updateOne(
            { _id: id }, 
            { $inc: { 'metadata.shareCount': 1 } },
            { upsert: true }
        );
    }
}
