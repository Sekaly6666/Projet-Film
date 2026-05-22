import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies() {
    return this.moviesService.findAll();
  }

  @Post('import')
  async importMovie(@Body() body: { tmdbId: number }) { 
    return this.moviesService.importFromTMDB(body);
  }

    @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
