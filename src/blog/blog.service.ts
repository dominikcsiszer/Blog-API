import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog, BlogDocument } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from './blog.types';
import { slugify } from 'src/utils/slug';
import { BlogDTO } from './blog.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        private readonly userService: UserService
    ) {}

    createSlug(title: string): string {
        // put the date like 2024/03/26/slugified-title in the slug
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const slug = `${year}/${month}/${day}/${slugify(title)}`;
        return slug;
    }

    async createBlog(params: BlogDTO, userEmail: string): Promise<BlogDocument> {
        try {
            const user = await this.userService.findOneByEmail(userEmail);
            const slug = this.createSlug(params.title); // Generate a slug from the title
            const newBlog = new this.blogModel({ 
                ...params, 
                author: {
                    name: user.fullname,
                    email: user.email
                },
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

    async isBlogOwner(userEmail: string, blogId: string): Promise<boolean> {
        const blog = await this.getBlogById(blogId)
        return blog.author.email === userEmail
    }
}
