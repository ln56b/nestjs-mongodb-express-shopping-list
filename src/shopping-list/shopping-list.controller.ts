import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
}
