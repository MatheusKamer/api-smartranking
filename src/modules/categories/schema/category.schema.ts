import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Player } from 'src/modules/players/schema/player.schema';

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  operation: string;

  @Prop()
  value: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true })
  category: string;

  @Prop()
  description: string;

  @Prop({ type: [EventSchema] })
  events: Event[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Player.name }] })
  players: Types.ObjectId[];

  @Prop()
  rankingPosition: number;

  @Prop()
  imageUrl: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
