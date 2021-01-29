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
import { ItemService } from 'src/item/item.service';
import { ShoppingListDTO } from './dto/shopping-list.dto';
import { ItemDTO } from '../item/dto/item.dto';
import { ShoppingListService } from './shopping-list.service';

@Controller('lists')
export class ShoppingListController {
  constructor(
    private shoppingListService: ShoppingListService,
    private itemService: ItemService,
  ) {}

  // post a list
  @Post()
  async addList(@Res() res, @Body() shoppingListDTO: ShoppingListDTO) {
    const list = await this.shoppingListService.addList(shoppingListDTO);
    return res.status(HttpStatus.OK).json({
      message: 'List successfully created',
      list,
    });
  }

  // get all lists
  @Get()
  async getAllLists(@Res() res) {
    const lists = await this.shoppingListService.getAllLists();
    return res.status(HttpStatus.OK).json(lists);
  }

  // get one list
  // @Get(':listId/items')
  // async getOneList(@Res() res, @Param('listId') id) {
  //   const list = await this.shoppingListService.getOneList(id);
  //   if (!list) throw new NotFoundException('List does not exist');
  //   return res.status(HttpStatus.OK).json(list);
  // }

  // update a list
  @Put(':listId')
  async updateList(
    @Res() res,
    @Param('listId') id,
    @Body() shoppingListDTO: ShoppingListDTO,
  ) {
    const list = await this.shoppingListService.updateList(id, shoppingListDTO);
    if (!list) throw new NotFoundException('List does not exist');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'List successfully updated', list });
  }

  // delete a list
  @Delete(':listId')
  async deleteList(@Res() res, @Param('listId') id) {
    const list = await this.shoppingListService.deleteList(id);
    if (!list) throw new NotFoundException('List does not exist');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'List successfully deleted', list });
  }

  // post an item in list
  @Post(':listId/items')
  async addItem(
    @Res() res,
    @Param('listId') listId: string,
    @Body() itemDTO: ItemDTO,
  ) {
    const list = await this.shoppingListService.getOneList(listId);
    const item = await this.itemService.addItem(listId, itemDTO);
    if (!list) throw new NotFoundException('List does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Item successfully created',
      item,
    });
  }
  // get all items from a list
  @Get(':listId/items')
  async getAllItems(@Res() res, @Param('listId') id: string) {
    const list = await this.shoppingListService.getOneList(id);
    if (!list) throw new NotFoundException('List does not exist');
    const items = await this.itemService.getAllItems(id);
    return res.status(HttpStatus.OK).json(items);
  }
  // get one item from list

  // update an item from list

  // delete an item from list
}
