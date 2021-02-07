import { Document } from 'mongoose';

export interface IItem extends Document {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly unit: string;
  readonly isMarkedOut: boolean;
  readonly shoppingList: string;
}
