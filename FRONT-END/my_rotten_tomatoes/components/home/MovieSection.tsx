import type {Movie } from "@/data/homeMovies";
import MovieCard   from "./MovieCard";


type MovieSectionProps ={ id?: string;  title: string; movies: Movie[];  };


export default function MovieSection( {id, title,movies  }:  MovieSectionProps) {

  return (
    <section id={id} className="container py-5 text-white">
        <h2 className="mb-4 fs-3 fw-bold"> {title}</h2>

      <div className="row g-4">
         { movies.map( (movie ) =>(

          <div key={movie.id} className="col-12 col-sm-6 col-lg-3">
              <MovieCard movie={movie} />
          </div>

        ))}

      </div>
    </section>

  );
}
