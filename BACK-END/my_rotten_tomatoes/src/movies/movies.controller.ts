import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies() {
    return this.moviesService.findAll();
  }

  @Get('search')
  async searchMovies(@Query('q') query: string) {
    return this.moviesService.search(query);
  }

  @Get('genre')
  async findByGenre(@Query('type') genre: string) {
    return this.moviesService.findByGenre(genre);
  }

  @Post('import')
  async importMovie(@Body() body: { tmdbId: number }) {
    return this.moviesService.importFromTMDB(body);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }

    @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.findById(id); 
  }
}
