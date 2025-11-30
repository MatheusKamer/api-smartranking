/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from './schema/category.schema';
import { PlayersService } from '../players/players.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { category } = createCategoryDto;

    const categoryAlreadyExists = await this.categoryModel.findOne({
      category,
    });

    if (categoryAlreadyExists) {
      throw new BadRequestException('Category already exists!');
    }

    const createdCategory = await this.categoryModel.create(createCategoryDto);

    this.logger.log(`createdCategory: ${JSON.stringify(createdCategory)}`);

    return createdCategory;
  }

  async addPlayerToCategory(categoryName: string, playerId: string) {
    const category = await this.categoryModel.findOne({
      category: categoryName,
    });

    if (!category) {
      throw new NotFoundException('Category not exists in DB!');
    }

    const player = await this.playersService.findPlayerById(playerId);

    if (!player) {
      throw new NotFoundException('Player not exists in DB!');
    }

    const playerAlreadyInCategory = category.players.some(
      (p) => p._id.toString() === playerId,
    );

    if (playerAlreadyInCategory) {
      throw new BadRequestException('Player already in this category!');
    }

    category.players.push(playerId as any);

    return await this.categoryModel.findOneAndUpdate(
      {
        category: categoryName,
      },
      { $set: category },
      { new: true },
    );
  }

  findAllCategories() {
    return this.categoryModel.find();
  }

  async findCategoryByName(categoryName: string) {
    const category = await this.categoryModel.findOne({
      category: categoryName,
    });

    if (!category) {
      throw new NotFoundException('Category not exists in DB!');
    }

    this.logger.log(`Category fetched: ${JSON.stringify(category)}`);

    return category;
  }

  async findPlayerCategory(playerId: string) {
    const categories = await this.categoryModel.find();

    this.logger.log(`Category fetched: ${JSON.stringify(categories)}`);

    const playerCategory = categories.find((category) =>
      category.players.some((player) => player._id.toString() === playerId),
    );

    if (!playerCategory) {
      throw new NotFoundException('Player does not belong to any category!');
    }

    this.logger.log(`Category fetched: ${JSON.stringify(playerCategory)}`);

    return playerCategory;
  }

  async update(categoryName: string, updateCategoryDto: UpdateCategoryDto) {
    let bodyToUpdate = {};

    bodyToUpdate = {
      description: updateCategoryDto.description,
      events: updateCategoryDto.events,
    };

    const updatedCategory = await this.categoryModel.findOneAndUpdate(
      { category: categoryName },
      { $set: bodyToUpdate },
      { new: true },
    );

    if (!updatedCategory) {
      throw new NotFoundException('Category not exists in DB!');
    }

    return updatedCategory;
  }

  async remove(id: string) {
    const deletedCategory = await this.categoryModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedCategory) {
      throw new NotFoundException('Category not exists in DB!');
    }

    return deletedCategory;
  }
}
