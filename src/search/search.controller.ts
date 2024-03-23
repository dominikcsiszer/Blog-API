import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { BlogDocument } from 'src/blog/blog.schema';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    // Search with query ?sort=asc&limit=10
    @Get()
    async searchBlogs(
        @Query('sort') sort: string, 
        @Query('limit') limit: number
    ): Promise<BlogDocument[]> {
        return this.searchService.searchBlogs(sort, limit);
    }

    // Search with query for field ?field=title&query=hello
    @Get()
    async searchBlogsByField(
        @Query('field') field: string, 
        @Query('query') query: string
    ): Promise<BlogDocument[]> {
        return this.searchService.searchBlogsByField(field, query);
    }

    // Search feature for viewCount
    @Get('popular')
    async getPopularBlogs(@Query('limit') limit?: number): Promise<BlogDocument[]> {
        return this.searchService.getPopularBlogs(limit);
    }
}
