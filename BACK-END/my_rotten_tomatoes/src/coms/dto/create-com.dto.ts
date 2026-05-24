import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateComDto {
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Veuillez entrer un commentaire' })
  commentaires!: string;

  @IsNumber({}, { message: 'La note doit être un nombre valide' })
  @IsNotEmpty({ message: 'Veuillez attribuer une note' })
  @Min(0, { message: 'La note minimale est de 0' })
  @Max(10, { message: 'La note maximale est de 10' })
  rating!: number;
}
