import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: "Veuillez saisir votre nom d'utilisateur " })
  username!: string;

  @IsEmail({}, { message: 'Veuillez fournir un email valide' })
  email!: string;

  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  password!: string;

  @IsNotEmpty({ message: 'Veuillez confirmer votre mot de passe' })
  password_confirm!: string;
}
