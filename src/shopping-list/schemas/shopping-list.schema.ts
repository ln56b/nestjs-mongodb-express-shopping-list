import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ShoppingList extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  client: string;

  @Prop({ type: Number, required: false })
  total: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  isMarkedOut: boolean;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        required: false,
        ref: 'Item',
      },
    ],
  })
  items: Types.ObjectId[];
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
