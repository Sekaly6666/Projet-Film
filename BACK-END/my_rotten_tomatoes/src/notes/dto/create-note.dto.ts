import { IsNumber, Min, Max, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'La note minimale est 1' })
  @Max(10, { message: 'La note maximale est 10' })
  notes!: number;
}
