import * as mongoose from 'mongoose';

export const ShoppingListSchema = new mongoose.Schema({
  name: String,
  client: String,
  shop: String,
  total: Number,
  createdAt: { type: Date, default: Date.now },
});
