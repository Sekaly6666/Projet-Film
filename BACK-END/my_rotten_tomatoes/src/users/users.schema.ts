import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
