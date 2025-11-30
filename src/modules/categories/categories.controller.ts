import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Post(':category/player/:playerId')
  addPlayerToCategory(
    @Param('category') category: string,
    @Param('playerId') playerId: string,
  ) {
    return this.categoriesService.addPlayerToCategory(category, playerId);
  }

  @Get()
  findAllCategories() {
    return this.categoriesService.findAllCategories().populate('players');
  }

  @Get(':category')
  findCategoryByName(@Param('category') category: string) {
    return this.categoriesService.findCategoryByName(category);
  }

  // @Get('player/:playerId')
  // findPlayerCategory(@Param('playerId') playerId: string) {
  //   return this.categoriesService.findPlayerCategory(playerId);
  // }

  @Patch(':category')
  update(
    @Param('category') category: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(category, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
