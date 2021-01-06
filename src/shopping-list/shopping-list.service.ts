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
  // get a single list

  // post a list
  async addList(shoppingListDTO: ShoppingListDTO): Promise<ShoppingList> {
    const newList = new this.shoppingListModel(shoppingListDTO);
    return newList.save();
  }

  // update a list

  // delete a list
}
