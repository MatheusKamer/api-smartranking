import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Player {
  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  ranking: string;

  @Prop()
  rankingPosition: number;

  @Prop()
  imageUrl: string;
}

export type PlayerDocument = Player & Document;

export const PlayerSchema = SchemaFactory.createForClass(Player);
