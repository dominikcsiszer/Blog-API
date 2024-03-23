import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BlogAuthorDTO, MetadataDTO } from 'src/types/global.dto';
import { BlogAuthor, Status } from './blog.types';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: BlogAuthorDTO })
  author: BlogAuthor;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true, default: Status.DRAFT, enum: Status })
  status: Status;

  @Prop()
  featuredImageUrl: string;

  @Prop({ default: { viewCount: 0, likeCount: 0, shareCount: 0 }, type: MetadataDTO })
  metadata: MetadataDTO;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
