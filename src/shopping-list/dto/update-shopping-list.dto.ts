import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingListDTO } from './create-shopping-list.dto';

export class UpdateShoppingListDTO extends PartialType(CreateShoppingListDTO) {}
