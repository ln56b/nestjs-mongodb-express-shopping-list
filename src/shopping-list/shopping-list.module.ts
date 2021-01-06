import { Module } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingListSchema } from './schemas/shopping-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShoppingList', schema: ShoppingListSchema },
    ]),
  ],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
})
export class ShoppingListModule {}
