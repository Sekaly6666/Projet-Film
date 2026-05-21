"use client"; 
import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import MovieSection from "@/components/home/MovieSection";
import { popularMovies } from "@/data/homeMovies";

export default function Home() {
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/movies")
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
      <MovieSection id="popular" title="Films populaires" movies={popularMovies} />
    </main>
  );
}
