import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShoppingList } from 'src/shopping-list/schemas/shopping-list.schema';

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'ShoppingList',
  })
  shoppingList: mongoose.Schema.Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// export const ItemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: Number,
//   unit: String,
//   isMarkedOut: { type: Boolean, default: false },
//   shoppingList: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ShoppingList',
//   },
// });
