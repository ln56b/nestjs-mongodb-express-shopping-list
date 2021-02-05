import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { ShoppingListModule } from 'src/shopping-list/shopping-list.module';
import { ShoppingListController } from 'src/shopping-list/shopping-list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => ShoppingListModule),
  ],
  providers: [ItemService],
  controllers: [ShoppingListController],
  exports: [ItemService],
})
export class ItemModule {}
