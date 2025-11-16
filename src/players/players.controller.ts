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

  @Get(':email')
  findPlayerByEmail(@Param('email') email: string) {
    return this.playersService.findPlayerByEmail(email);
  }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.updatePlayer(email, updatePlayerDto);
  }

  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.playersService.delete(email);
  }
}
