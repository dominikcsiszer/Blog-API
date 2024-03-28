import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Req, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Blog, BlogDocument } from './blog.schema';
import { BlogDTO, UpdateBlogDTO } from './blog.dto';
import { BlogService } from './blog.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createBlog(
        @Body() body: BlogDTO,
        @Request() req
    ): Promise<any> {
        return this.blogService.createBlog(body, req.user.email);
    }

    @Get()
    async getBlogs(): Promise<BlogDocument[]> {
        return this.blogService.getBlogs();
    }

    @Get('/:id')
    async getBlogById(
        @Param('id') id: string
    ): Promise<BlogDocument> {
        await this.blogService.addViewToBlog(id);
        return await this.blogService.getBlogById(id);
    }

    @UseGuards(JwtGuard)
    @Put('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateBlog(
        @Param('id') id: string,
        @Body() body: UpdateBlogDTO,
        @Request() req
    ): Promise<string> {
        try {
            if(!await this.blogService.isBlogOwner(req.user.email, id))
                throw new UnauthorizedException('You are not the owner of this blog');

            await this.blogService.updateBlogById(id, body);
            return 'Blog updated successfully';
        } catch (error) {
            throw new InternalServerErrorException('Error updating blog');
        }
    }

    @Put('/:id/like')
    async likeBlog(
        @Param('id') id: string
    ): Promise<string> {
        try {
            await this.blogService.addLikeToBlog(id);
            return 'Blog liked successfully';
        } catch (error) {
            throw new Error('Error liking blog');
        }
    }

    @Put('/:id/share')
    async shareBlog(
        @Param('id') id: string
    ): Promise<string> {
        try {
            await this.blogService.addShareToBlog(id);
            return 'Blog shared successfully';
        } catch (error) {
            throw new Error('Error sharing blog');
        }
    }

    @Put('/:id/archive')
    async archiveBlog(
        @Param('id') id: string
    ): Promise<string> {
        try {
            await this.blogService.deleteBlogById(id);
            return 'Blog archived successfully';
        } catch (error) {
            throw new Error('Error archiving blog');
        }
    }
}
