import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Player } from 'src/modules/players/schema/player.schema';

export type MatchDocument = HydratedDocument<Match>;

@Schema({ timestamps: true })
export class Match {
  @Prop()
  category: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Player.name }] })
  players: Types.ObjectId[];

  @Prop({ type: SchemaTypes.ObjectId, ref: Player.name })
  def: Types.ObjectId;

  @Prop({
    type: [
      {
        set: { type: String },
      },
    ],
  })
  result: { set: string }[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);
