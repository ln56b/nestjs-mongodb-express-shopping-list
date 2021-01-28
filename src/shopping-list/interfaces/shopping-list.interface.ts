import { Document } from 'mongoose';

export interface ShoppingList extends Document {
  readonly name: string;
  readonly client: string;
  readonly total: number;
  readonly createdAt: Date;
  readonly isMarkedOut: boolean;
  readonly items: string[];
}
