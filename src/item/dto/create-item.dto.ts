import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  readonly price: number;

  @IsInt()
  readonly quantity: number;

  @IsString()
  readonly unit: string;

  readonly isMarkedOut: boolean;

  readonly shoppingList: string;
}
