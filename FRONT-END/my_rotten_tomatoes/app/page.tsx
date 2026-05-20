import   Header from "@/components/home/Header" ;
  import Hero from  "@/components/home/Hero";
import  MovieSection from    "@/components/home/MovieSection" ;
import { popularMovies,  recentMovies } from "@/data/homeMovies" ;

export default function  Home()  {

  return (
    <main className="min-vh-100 bg-dark text-white">
      
      <Header />
      <Hero />
      <MovieSection id="popular" title="Films populaires" movies={popularMovies} />
      <MovieSection title="Nouveautes" movies={recentMovies} />
      
    </main>

  );

}
