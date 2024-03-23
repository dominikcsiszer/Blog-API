import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Blog, BlogDocument } from './blog.schema';
import { BlogDTO, UpdateBlogDTO } from './blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createBlog(
        @Body() body: BlogDTO
    ): Promise<BlogDocument> {
        return this.blogService.createBlog(body);
    }

    @Get()
    async getBlogs(): Promise<BlogDocument[]> {
        return this.blogService.getBlogs();
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateBlog(
        @Param('id') id: string,
        @Body() body: UpdateBlogDTO
    ): Promise<BlogDocument> {
        return this.blogService.updateBlogById(id, body);
    }
}
