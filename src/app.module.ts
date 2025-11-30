import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './modules/players/players.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ChallengesModule } from './modules/challenges/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL!),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
