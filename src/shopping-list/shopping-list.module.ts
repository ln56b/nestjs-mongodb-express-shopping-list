import { forwardRef, Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingListSchema } from './schemas/shopping-list.schema';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShoppingList', schema: ShoppingListSchema },
    ]),
    forwardRef(() => ItemModule),
  ],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
  exports: [ShoppingListService],
})
export class ShoppingListModule {}
