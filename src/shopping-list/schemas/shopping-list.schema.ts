import * as mongoose from 'mongoose';

export const ShoppingListSchema = new mongoose.Schema({
  name: String,
  client: String,
  total: Number,
  createdAt: { type: Date, default: Date.now },
  isMarkedOut: { type: Boolean, default: false },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});
