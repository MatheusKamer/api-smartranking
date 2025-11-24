import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  findPlayerById(@Param('id') id: string) {
    return this.playersService.findPlayerById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.playersService.delete(id);
  }
}
