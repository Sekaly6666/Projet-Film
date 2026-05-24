import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComsService } from './coms.service';
import { CreateComDto } from './dto/create-com.dto';
import { UpdateComDto } from './dto/update-com.dto';

@Controller('coms')
export class ComsController {
  constructor(private readonly comsService: ComsService) {}

  @Post()
  create(@Body() createComDto: CreateComDto) {
    return this.comsService.create(createComDto);
  }

  @Get()
  findAll() {
    return this.comsService.findAll();
  }

  @Get('movie/:movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.comsService.findByMovie(movieId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComDto: UpdateComDto) {
    return this.comsService.update(id, updateComDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comsService.remove(id);
  }
@Get('dashboard/stats')
async getStats() {
  return this.comsService.getDashboardStats();
}

}
