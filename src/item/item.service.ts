import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDTO } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { ShoppingList } from '../shopping-list/schemas/shopping-list.schema';
import { UpdateItemDTO } from './dto/update-item.dto';

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

  // update item from list
  async updateItem(
    listId: string,
    itemId: string,
    updateItemDTO: UpdateItemDTO,
  ): Promise<Item> {
    const itemToUpdate = await this.shoppingListModel
      .findById({ _id: listId })
      .populate('items')
      .exec()
      .then(() => {
        return this.itemModel.findByIdAndUpdate(
          { _id: itemId },
          { $set: updateItemDTO },
          { new: true, useFindAndModify: false },
        );
      });
    return itemToUpdate;
  }

  // delete item from list
  async deleteItem(listId: string, itemId: string): Promise<any> {
    const itemToDelete = await this.shoppingListModel
      .findById({ _id: listId })
      .populate('items')
      .exec()
      .then(() => {
        return this.itemModel.findByIdAndRemove(
          { _id: itemId },
          { new: true, useFindAndModify: false },
        );
      });
    return itemToDelete;
  }
}
