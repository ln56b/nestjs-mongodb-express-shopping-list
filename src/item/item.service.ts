import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDTO } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { ShoppingList } from '../shopping-list/schemas/shopping-list.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
    @InjectModel(ShoppingList.name)
    private readonly shoppingListModel: Model<ShoppingList>,
  ) {}

  // post an item
  async addItem(listId: string, createItemDTO: CreateItemDTO): Promise<Item> {
    const newItem = await new this.itemModel(createItemDTO);

    return this.shoppingListModel
      .findByIdAndUpdate(
        listId,
        { $push: { items: newItem._id } },
        { new: true, useFindAndModify: false },
      )
      .then(() => {
        return newItem.save();
      });
  }

  // get one item from list
  async getItem(listId: string, itemId: string): Promise<Item> {
    const item = await this.shoppingListModel
      .findById({ _id: listId })
      .populate('items')
      .exec()
      .then(() => {
        return this.itemModel.findById({ _id: itemId });
      });
    return item;
  }
}
