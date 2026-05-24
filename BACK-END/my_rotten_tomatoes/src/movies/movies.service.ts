import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Movie, MovieDocument } from './movie.schema';
import { isValidObjectId } from 'mongoose';

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
      const tmdbId =
        typeof body === 'object' && body.tmdbId ? body.tmdbId : body;
      const apiKey = '3208e68923da46a11e570ce9d95519cc';

      const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=fr-FR`;

      console.log('URL :', url);

      const response = await firstValueFrom(this.httpService.get(url));
      const tmdbMovie = response.data;

      const newMovie = new this.movieModel({
        tmdbId: tmdbMovie.id,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        poster_path: tmdbMovie.poster_path,
        vote_average: tmdbMovie.vote_average,
        release_date: tmdbMovie.release_date,
      });

      return await newMovie.save();
    } catch (error: any) {
      console.error(
        "Détail de l'erreur :",
        error.response?.data || error.message,
      );

      if (error.code === 11000){
        throw new ConflictException('Ce film a déjà été importé.');
      }
        
        
        throw new HttpException(
        "Impossible d'importer le film depuis TMDB.",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();

    if (!deletedMovie) {
      throw new NotFoundException(
        `Le film avec l'ID ${id} n'a pas été trouvé.`,
      );
    }

    return { message: 'Film supprimé avec succès', id };
  }

  async search(query: string) {
    if (!query) return [];
    return this.movieModel
      .find({
        title: { $regex: query, $options: 'i' },
      })
      .exec();
  }

  async findByGenre(genre: string) {
    if (!genre) return [];
    return this.movieModel
      .find({
        genre: { $regex: genre, $options: 'i' },
      })
      .exec();
  }

   async findById(id: string): Promise<Movie> {
    if (!isValidObjectId(id)) {
    throw new NotFoundException(`L'identifiant "${id}" n'est pas un ID valide.`);
  }
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException(`Le film avec l'ID ${id} n'existe pas.`);
    }
    return movie;
  }
}

