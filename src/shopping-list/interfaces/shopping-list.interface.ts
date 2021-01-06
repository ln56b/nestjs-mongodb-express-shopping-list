import { Document } from 'mongoose';

export interface ShoppingList extends Document {
  readonly name: string;
  readonly client: string;
  readonly shop: string;
  readonly total: number;
  readonly createdAt: Date;
}