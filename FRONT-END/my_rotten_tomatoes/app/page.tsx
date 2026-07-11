"use client"; 
import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import MovieSection from "@/components/home/MovieSection";
import PopularMovies from "@/components/home/PopularMovies";

type Movie = {
  _id: string;
  title: string;
  overview: string;
  poster_path?: string;
  vote_average: number;
  release_date: string;
};

export default function Home() {
  const [myMovies, setMyMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/movies`)
      .then((res) => res.json())
      .then((data) => setMyMovies(data))
      .catch((err) => console.error("Erreur de récupération des films :", err));
  }, []);

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Header />
      <Hero />
      
      <MovieSection 
        id="imported" 
        title="Mes Films (TMDB)" 
        movies={myMovies} 
      />
      <PopularMovies />
    </main>
  );
}
