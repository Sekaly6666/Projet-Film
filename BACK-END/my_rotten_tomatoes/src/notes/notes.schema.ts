import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotesDocument = Notes & Document;

@Schema({ timestamps: true })
export class Notes {
  @Prop({ required: true })
  movieId!: string;

  @Prop({ required: true, min: 1, max: 10 })
  notes!: number;
}
export const NotesSchema = SchemaFactory.createForClass(Notes);
