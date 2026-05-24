"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchMovies() {
    try {

      const res = await fetch(`https://api.themoviedb.org/3/movie/popular`);
      const data = await res.json();
      
      if (data.results) {
        const formattedMovies = data.results.map((movie: any) => ({
          ...movie,
          description: movie.overview
        }));
        setMovies(formattedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Erreur TMDB:", error);
    } finally {
      setLoading(false);
    }
  }
  fetchMovies();
}, []);


  if (loading) return <p className="text-white p-4">Chargement des films...</p>;

  return (
    <section className="my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Films Populaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
   {movies.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={{
      id: movie.id,
      title: movie.title,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        overview: movie.overview,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    }} 
  />
))}

      </div>
    </section>
  );
}
