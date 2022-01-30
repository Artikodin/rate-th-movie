import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query('limit') limit: string) {
    return `This action returns all cats (limit: ${limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
