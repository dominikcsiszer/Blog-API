import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BlogAuthor, Metadata, Status } from './blog.types';
import { BlogAuthorDTO, MetadataDTO } from 'src/types/global.dto';

export type BlogDocument = HydratedDocument<Blog>;

Schema()
export class Blog {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String})
    content: string;

    @Prop({ required: true, type: BlogAuthorDTO})
    author: BlogAuthor;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ required: true, type: String, unique: true, index: true })
    slug: string;

    @Prop({ required: true, default: Status.DRAFT, type: Status })
    status: Status;

    @Prop({ type: String })
    featuredImageUrl: string;

    @Prop({ default: {viewCount: 0, likeCount: 0, shareCount: 0}, type: MetadataDTO })
    metadata: Metadata;

    @Prop({ required: true, default: Date.now, type: Date })
    createdAt: Date;

    @Prop({ required: true, default: Date.now, type: Date })
    updatedAt: Date;
}

export type BlogCreationParams = Partial<Blog>

export const BlogSchema = SchemaFactory.createForClass(Blog);