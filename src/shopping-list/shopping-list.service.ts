import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingList } from './interfaces/shopping-list.interface';
import { ShoppingListDTO } from './dto/shopping-list.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel('ShoppingList')
    private readonly shoppingListModel: Model<ShoppingList>,
  ) {}

  // fetch all lists
  async getAllLists(): Promise<ShoppingList[]> {
    const lists = await this.shoppingListModel.find().exec();
    return lists;
  }
  // get a single lists
  async getOneList(id: number): Promise<ShoppingList> {
    const list = await this.shoppingListModel.findById(id).exec();
    return list;
  }

  // post a list
  async addList(shoppingListDTO: ShoppingListDTO): Promise<ShoppingList> {
    const newList = new this.shoppingListModel(shoppingListDTO);
    return newList.save();
  }

  // update a list
  async updateList(
    id: number,
    shoppingListDTO: ShoppingListDTO,
  ): Promise<ShoppingList> {
    const updatedList = await this.shoppingListModel.findByIdAndUpdate(
      id,
      shoppingListDTO,
      { new: true },
    );
    return updatedList;
  }
  // delete a list
  async deleteList(id): Promise<any> {
    const deletedList = await this.shoppingListModel.findByIdAndRemove(id);
    return deletedList;
  }
}
