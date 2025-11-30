import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Player } from 'src/modules/players/schema/player.schema';

export type ChallengeDocument = HydratedDocument<Challenge>;

@Schema({ timestamps: true })
export class Challenge {
  @Prop()
  challengeTime: Date;

  @Prop({
    type: String,
    enum: ['DECLINED', 'PENDING', 'FINISHED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({ default: new Date() })
  requestTime: Date;

  @Prop()
  applicant: string;

  @Prop()
  category: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Player.name }] })
  players: Types.ObjectId[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
