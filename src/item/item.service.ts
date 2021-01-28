import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { ItemDTO } from './dto/item.dto';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<Item>,
    private shoppingListService: ShoppingListService,
  ) {}

  // post an item
  async addItem(listId: string, itemDTO: ItemDTO): Promise<Item> {
    const newItem = new this.itemModel(itemDTO);
    const savedItem = await newItem.save();
    //console.log(`this is the savedItem ${savedItem}`);
    await this.shoppingListService.getOneList(listId),
      { $push: { items: savedItem._id } },
      { new: true, useAndModify: false };
    return savedItem;
  }

  // fetch all items in a list
  async getAllItems(listId: string): Promise<Item[]> {
    const items = await this.itemModel
      .find({ shoppingList: listId })
      .populate('shoppingList')
      .exec();
    return items;
  }

  // get a single item in a list
}
