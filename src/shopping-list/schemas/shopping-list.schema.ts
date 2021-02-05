import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from 'src/item/schemas/item.schema';

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
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Item',
      },
    ],
  })
  items: mongoose.Schema.Types.ObjectId[];
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);

// const ShoppingListSchema = new mongoose.Schema({
//   name: String,
//   client: String,
//   total: Number,
//   createdAt: { type: Date, default: Date.now },
//   isMarkedOut: { type: Boolean, default: false },
//   items: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Item',
//     },
//   ],
// });

// export default mongoose.model('ShoppingList', ShoppingListSchema);
