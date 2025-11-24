import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDocument } from './schema/player.schema';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player') private readonly playerModel: Model<PlayerDocument>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;

    const playerAlreadyExists = await this.playerModel.findOne({ email });

    if (playerAlreadyExists) {
      throw new BadRequestException('Email is already in use!');
    }

    const createdPlayer = await this.playerModel.create(createPlayerDto);

    this.logger.log(`createPlayerDto: ${JSON.stringify(createdPlayer)}`);

    return createdPlayer;
  }

  findAllPlayers() {
    return this.playerModel.find();
  }

  async findPlayerById(id: string) {
    const player = await this.playerModel.findOne({ _id: id });

    if (!player) {
      throw new NotFoundException('Player not exists in DB');
    }

    this.logger.log(`Player fetched: ${JSON.stringify(player)}`);

    return player;
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto) {
    const updatedPlayer = await this.playerModel.findOneAndUpdate(
      { _id: id },
      { $set: updatePlayerDto },
      { new: true },
    );

    if (!updatedPlayer) {
      throw new NotFoundException('Player not exists in DB');
    }

    return updatedPlayer;
  }

  async delete(id: string) {
    const deletedPlayer = await this.playerModel.findOneAndDelete({ _id: id });

    if (!deletedPlayer) {
      throw new NotFoundException('Player not exists in DB');
    }

    return deletedPlayer;
  }
}
