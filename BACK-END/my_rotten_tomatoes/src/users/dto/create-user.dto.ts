import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Le mot de passe est trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.',
    },
  )
  password: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}
