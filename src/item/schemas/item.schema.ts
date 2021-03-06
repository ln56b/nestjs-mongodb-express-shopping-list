import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: false })
  price: number;

  @Prop({ type: Number, required: false })
  quantity: number;

  @Prop({ type: String, required: false })
  unit: string;

  @Prop({ type: Boolean, default: false })
  isMarkedOut: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
