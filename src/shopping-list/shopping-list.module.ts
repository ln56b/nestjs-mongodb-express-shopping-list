import { forwardRef, Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShoppingList,
  ShoppingListSchema,
} from './schemas/shopping-list.schema';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingList.name, schema: ShoppingListSchema },
    ]),
    forwardRef(() => ItemModule),
  ],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
  exports: [ShoppingListService, MongooseModule],
})
export class ShoppingListModule {}
