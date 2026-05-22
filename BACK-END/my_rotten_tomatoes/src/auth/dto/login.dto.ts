import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez fournir un email valide' })
  email!: string;

  @IsNotEmpty({ message: 'Veuillez saisir votre mot de passe' })
  password!: string;
}

