export class ShoppingListDTO {
  readonly name: string;
  readonly client: string;
  readonly total: number;
  readonly createdAt: Date;
  readonly isMarkedOut: boolean = false;
  readonly items: string[];
}
