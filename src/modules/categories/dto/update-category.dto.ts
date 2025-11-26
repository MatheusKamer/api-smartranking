import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Event } from '../schema/category.schema';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  events?: Array<Event>;
}
