import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComsDocument = Coms & Document;

@Schema({ timestamps: true })
export class Coms {
  @Prop({ required: true })
  movieId!: string;

  @Prop({ required: true })
  userName!: string;

  @Prop({ required: true })
  commentaires!: string;

  @Prop({ required: true, min: 0, max: 10 })
  rating!: number;
}

export const ComsSchema = SchemaFactory.createForClass(Coms);
