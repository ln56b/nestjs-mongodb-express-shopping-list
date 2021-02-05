import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateShoppingListDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly client: string;

  readonly total: number;

  @IsDate()
  readonly createdAt: Date;

  readonly isMarkedOut: boolean = false;

  readonly items: string[];
}
