export class ItemDTO {
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly unit: string;
  readonly isMarkedOut: boolean;
  readonly shoppingListId: string;
}
