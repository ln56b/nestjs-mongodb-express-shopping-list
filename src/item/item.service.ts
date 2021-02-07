import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDTO } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<Item>,
  ) {}

  // post an item
  async addItem(listId: string, createItemDTO: CreateItemDTO): Promise<Item> {
    const newItem = await new this.itemModel({
      name: createItemDTO.name,
      price: createItemDTO.price,
      quantity: createItemDTO.quantity,
      unit: createItemDTO.unit,
      isMarkedOut: createItemDTO.isMarkedOut,
      shoppingList: listId,
    });

    const savedItem = await newItem.save();
    return savedItem;
  }

  // fetch all items in a list
  async getAllItems(listId: string): Promise<Item[]> {
    const items = await this.itemModel
      .find({ shoppingList: listId })
      .populate('shoppingList')
      .exec();
    console.log(items);
    return items;
  }

  // get a single item in a list
}
