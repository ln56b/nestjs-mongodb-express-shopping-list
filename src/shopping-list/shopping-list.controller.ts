import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateShoppingListDTO } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDTO } from './dto/update-shopping-list.dto';
import { CreateItemDTO } from '../item/dto/create-item.dto';
import { ShoppingListService } from './shopping-list.service';
import { ItemService } from 'src/item/item.service';
import { UpdateItemDTO } from 'src/item/dto/update-item.dto';

@Controller('lists')
export class ShoppingListController {
  constructor(
    private shoppingListService: ShoppingListService,
    private itemService: ItemService,
  ) {}

  // post a list
  @Post()
  async addList(
    @Res() res,
    @Body() createShoppingListDTO: CreateShoppingListDTO,
  ) {
    try {
      const list = await this.shoppingListService.addList(
        createShoppingListDTO,
      );
      return res.status(HttpStatus.OK).json({
        message: 'List successfully created',
        list,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: List not created',
        status: 400,
      });
    }
  }

  // get all lists
  @Get()
  async getAllLists(@Res() res) {
    const lists = await this.shoppingListService.getAllLists();
    return res.status(HttpStatus.OK).json(lists);
  }

  // get one list with items
  @Get(':listId/items')
  async getOneListWithItems(@Res() res, @Param('listId') listId: string) {
    const list = await this.shoppingListService.getOneList(listId);
    if (!list) {
      throw new NotFoundException('List does not exist');
    }
    return res.status(HttpStatus.OK).json(list);
  }

  // get one item from list
  @Get(':listId/items/:itemId')
  async getOneItemFromList(
    @Res() res,
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
  ) {
    const list = await this.shoppingListService.getOneList(listId);

    if (!list) {
      throw new NotFoundException('List does not exist');
    }

    const item = await this.itemService.getItem(listId, itemId);
    if (!item) {
      throw new NotFoundException('Item does not exist');
    }
    return res.status(HttpStatus.OK).json(item);
  }

  // update a list
  @Put(':listId')
  async updateList(
    @Res() res,
    @Param('listId') listId: string,
    @Body() updateShoppingListDTO: UpdateShoppingListDTO,
  ) {
    const list = await this.shoppingListService.updateList(
      listId,
      updateShoppingListDTO,
    );
    if (!list) {
      throw new NotFoundException('List does not exist');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'List successfully updated', list });
  }

  // delete a list
  @Delete(':listId')
  async deleteList(@Res() res, @Param('listId') listId: string) {
    if (!listId) {
      throw new NotFoundException('List ID does not exist');
    }
    const list = await this.shoppingListService.deleteList(listId);

    if (!list) {
      throw new NotFoundException('List does not exist');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'List successfully deleted', list });
  }

  // post an item in list
  @Post(':listId/items')
  async addItem(
    @Res() res,
    @Param('listId') listId: string,
    @Body() createItemDTO: CreateItemDTO,
  ) {
    const list = await this.shoppingListService.getOneList(listId);
    if (!list) {
      throw new NotFoundException('List does not exist');
    }
    const item = await this.itemService.addItem(listId, createItemDTO);

    return res.status(HttpStatus.OK).json({
      message: 'Item successfully created',
      item,
    });
  }

  // update an item from list
  @Put(':listId/items/:itemId')
  async updateItem(
    @Res() res,
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDTO: UpdateItemDTO,
  ) {
    const list = await this.shoppingListService.getOneList(listId);
    if (!list) {
      throw new NotFoundException('List does not exist');
    }

    if (!itemId) {
      throw new NotFoundException('Item does not exist');
    }

    const item = await this.itemService.updateItem(
      listId,
      itemId,
      updateItemDTO,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Item successfully updated', item });
  }
  // delete an item from list
  @Delete(':listId/items/:itemId')
  async deleteItem(
    @Res() res,
    @Param('listId') listId: string,
    @Param('itemId') itemId: string,
  ) {
    const list = await this.shoppingListService.getOneList(listId);
    if (!list) {
      throw new NotFoundException('List does not exist');
    }

    if (!itemId) {
      return new NotFoundException('Item does not exist');
    }
    const item = this.itemService.deleteItem(listId, itemId);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Item successfully deleted', item });
  }
}
