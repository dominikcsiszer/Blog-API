import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  password: string;

}

export type UserCreationParams = Partial<User>

export const UserSchema = SchemaFactory.createForClass(User);
