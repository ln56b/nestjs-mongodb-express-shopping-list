import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  unit: String,
  isMarkedOut: { type: Boolean, default: false },
  shoppingList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingList',
  },
});
