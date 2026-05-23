import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComDto {
  @IsString()
  @IsNotEmpty()
  movieId!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsString({ message: 'Le commentaire doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'Veuillez entrer un commentaire' })
  commentaires!: string;
}
