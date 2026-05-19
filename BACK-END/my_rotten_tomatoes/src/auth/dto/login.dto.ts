import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    { require_tld: true },
    { message: 'mot de passe ou email incorrect' },
  )
  @IsNotEmpty({ message: 'mot de passe ou email incorrect' })
  email!: string;

  @IsNotEmpty({ message: 'mot de passe ou email incorrect' })
  @IsString({ message: 'mot de passe ou email incorrect' })
  password!: string;
}
