import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingListDTO } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDTO } from './dto/update-shopping-list.dto';
import { ShoppingList } from './schemas/shopping-list.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name)
    private readonly shoppingListModel: Model<ShoppingList>,
  ) {}

  // post a list
  async addList(
    createShoppingListDTO: CreateShoppingListDTO,
  ): Promise<ShoppingList> {
    const newList = await new this.shoppingListModel(createShoppingListDTO);
    return newList.save();
  }

  // fetch all lists
  async getAllLists(): Promise<ShoppingList[]> {
    const lists = await this.shoppingListModel
      .find()
      .populate('items')
      .exec();
    return lists;
  }
  // get a single list
  async getOneList(listId: string): Promise<ShoppingList> {
    const list = await this.shoppingListModel
      .findById({ _id: listId })
      .populate('items')
      .exec();

    if (!list) {
      throw new NotFoundException(`List #${listId} does not exist`);
    }
    return list;
  }

  // update a list
  async updateList(
    listId: string,
    updateShoppingListDTO: UpdateShoppingListDTO,
  ): Promise<ShoppingList> {
    const listToUpdate = await this.shoppingListModel.findByIdAndUpdate(
      { _id: listId },
      { $set: updateShoppingListDTO },
      { new: true, useFindAndModify: false },
    );

    if (!listToUpdate) {
      throw new NotFoundException(`List #${listId} does not exist`);
    }
    return listToUpdate;
  }
  // delete a list
  async deleteList(listId: string): Promise<any> {
    const deletedList = await this.shoppingListModel.findByIdAndRemove(
      { _id: listId },
      { new: true, useFindAndModify: false },
    );
    return deletedList;
  }
}
