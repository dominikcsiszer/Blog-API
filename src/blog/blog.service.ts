import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogCreationParams, BlogDocument } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './blog.types';
import { slugify } from 'src/utils/slug';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async createBlog(params: BlogCreationParams): Promise<BlogDocument> {
        console.log("Create blog params: ", params);
        try {
            const slug = slugify(params.title);
            console.log("Slug: ", slug);
            const newBlog =  new this.blogModel(); // Create a new blog object
            console.log("New Blog Object:", newBlog); // Log the new blog object
            return newBlog.save(); // Return the saved blog
        } catch (error) {
            console.error(error);
            throw new Error("Error creating blog");
        }
    }
    

    async getBlogs(): Promise<BlogDocument[]> {
        return this.blogModel.find().exec();
    }

    async getBlogById(id: string): Promise<BlogDocument> {
        return this.blogModel.findOne({ _id: id }).exec();
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
            params,
            updatedAt: new Date(),
        })

        return blog.save();
    }

    async deleteBlogById(id: string): Promise<BlogDocument> {
        const blog = await this.getBlogById(id)
        if(!blog) {
            throw new NotFoundException(`Blog with Identifier ${id} not found`)
        }

        return this.updateBlogById(id, { status: Status.ARCHIVED })
    }
}
