import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
     @IsOptional()
      @IsString()
      username?: string;
    
      @IsOptional()
      @IsEmail()
      email?: string | undefined;

      @IsOptional()
      @IsString()
      password?: string | undefined;
      
}
