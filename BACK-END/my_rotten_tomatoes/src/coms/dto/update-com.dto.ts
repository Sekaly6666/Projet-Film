import { PartialType } from '@nestjs/mapped-types';
import { CreateComDto } from './create-com.dto';
import { IsOptional } from 'class-validator';

export class UpdateComDto extends PartialType(CreateComDto) {
  @IsOptional()
  commentaires?: string | undefined;
}
