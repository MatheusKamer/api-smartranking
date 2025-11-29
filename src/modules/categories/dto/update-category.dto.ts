import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Event } from '../schema/category.schema';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  events?: Array<Event>;
}
