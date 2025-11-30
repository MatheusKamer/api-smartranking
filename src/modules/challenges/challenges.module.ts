import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { PlayersModule } from '../players/players.module';
import { CategoriesModule } from '../categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './schema/challenge.schema';
import { Match, MatchSchema } from './schema/matches.schema';

@Module({
  imports: [
    PlayersModule,
    CategoriesModule,
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
      { name: Match.name, schema: MatchSchema },
    ]),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
