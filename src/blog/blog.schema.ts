import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { BlogAuthorDTO, MetadataDTO } from 'src/types/global.dto';
import { BlogAuthor, Status } from './blog.types';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  lead: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: BlogAuthorDTO })
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

export type BlogCreationParams = Partial<Blog>

export const BlogSchema = SchemaFactory.createForClass(Blog);
