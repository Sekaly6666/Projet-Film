import { Injectable, HttpException, HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Movie, MovieDocument } from './movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

   async importFromTMDB(body: any): Promise<Movie> {
    try {
      const tmdbId = typeof body === 'object' && body.tmdbId ? body.tmdbId : body;
      const apiKey = '3208e68923da46a11e570ce9d95519cc';

      
      const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=fr-FR`;

      console.log("URL :", url);

      const response = await firstValueFrom(this.httpService.get(url));
      const tmdbMovie = response.data;

      const newMovie = new this.movieModel({
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,    
        poster_path: tmdbMovie.poster_path,
        vote_average: tmdbMovie.vote_average,
        release_date: tmdbMovie.release_date,
      });

      return await newMovie.save();
    } catch (error: any) {
      console.error("Détail de l'erreur :", error.response?.data || error.message);
      throw new HttpException(
        "Impossible d'importer le film depuis TMDB.",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

async delete(id: string) {
 
  const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
  
  if (!deletedMovie) {
    throw new NotFoundException(`Le film avec l'ID ${id} n'a pas été trouvé.`);
  }
  
  return { message: 'Film supprimé avec succès', id };
}

}
