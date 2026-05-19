import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  @IsAlphanumeric('fr-FR')
  @Matches(/[a-zA-Z]/, {
    message: 'Le champ doit contenir au moins une lettre',
  })
  username!: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: "L'adresse email est requise" })
  @IsEmail(
    { require_tld: true },
    { message: 'Entrez une adresse email valide' },
  )
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Entrez une adresse email valide',
  })
  email!: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
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
  password!: string;

  @IsNotEmpty({ message: 'Les mots de passe doivent être identiques' })
  @IsString({ message: 'Les mots de passe doivent être identiques' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Les mots de passe doivent être identiques',
    },
  )
  password_confirm!: string;

  @IsOptional()
  @IsString()
  image?: string;
}
