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
import { ShoppingListDTO } from './dto/shopping-list.dto';
import { ShoppingListService } from './shopping-list.service';

@Controller('lists')
export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

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
  @Get(':listId')
  async getOneList(@Res() res, @Param('listId') id) {
    const list = await this.shoppingListService.getOneList(id);
    if (!list) throw new NotFoundException('List does not exist');
    return res.status(HttpStatus.OK).json(list);
  }

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
}
