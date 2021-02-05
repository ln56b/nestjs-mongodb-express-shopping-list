import { Document, ObjectId } from 'mongoose';

export interface IShoppingList extends Document {
  readonly name: string;
  readonly client: string;
  readonly total: number;
  readonly createdAt: Date;
  readonly isMarkedOut: boolean;
  readonly items: ObjectId[];
}
