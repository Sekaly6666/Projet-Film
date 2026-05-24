import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {

@Prop({ required: true, unique: true })
tmdbId: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  overview: string;

  @Prop()
  poster_path: string;

  @Prop({ default: 0 })
  vote_average: number;

  @Prop()
  release_date: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
MovieSchema.index({ title: 1, release_date: 1 }, { unique: true });
