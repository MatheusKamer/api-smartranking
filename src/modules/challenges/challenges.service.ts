import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeDocument } from './schema/challenge.schema';
import { MatchDocument } from './schema/matches.schema';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<ChallengeDocument>,
    @InjectModel('Match') private readonly matchModel: Model<MatchDocument>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const playersFromDB = await this.playersService.findAllPlayers();

    const playersExists = createChallengeDto.players.filter((playerDto) =>
      playersFromDB.some((p) => p._id.toString() === playerDto._id),
    );

    if (!playersExists) {
      throw new BadRequestException(`One or more players don't exists in DB`);
    }

    const applicantIsPlayer = createChallengeDto.players.filter(
      (player) => player._id === createChallengeDto.applicant,
    );

    if (!applicantIsPlayer) {
      throw new BadRequestException(
        `Applicant needs to be player in the match`,
      );
    }

    const applicantCategory = await this.categoriesService.findPlayerCategory(
      createChallengeDto.applicant,
    );

    if (!applicantCategory) {
      throw new BadRequestException(
        `Applicant does not belong for any category`,
      );
    }

    const challengeToCreate = {
      ...createChallengeDto,
      category: applicantCategory.category,
    };

    this.logger.log(`Created challenge: ${JSON.stringify(challengeToCreate)}`);

    return this.challengeModel.create(challengeToCreate);
  }

  findAll() {
    return this.challengeModel.find();
  }

  findOne(playerId: string) {
    return `This action returns a #${playerId} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} ${JSON.stringify(updateChallengeDto)} challenge`;
  }

  remove(challengId: string) {
    return this.challengeModel.findOneAndDelete({ _id: challengId });
  }
}
