import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class ChallengePlayerDto {
  @IsNotEmpty()
  _id: string;
}

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeTime: Date;

  @IsNotEmpty()
  applicant: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChallengePlayerDto)
  players: ChallengePlayerDto[];
}
