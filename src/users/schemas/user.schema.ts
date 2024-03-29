// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  age: number;

  @Prop([String]) 
  hobbies: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
