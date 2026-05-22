"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  _id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

type MoviesPageProps = {
  searchParams?: any;
};

export default function MoviesPage({ searchParams }: MoviesPageProps) {
  const router = useRouter();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (searchParams) {
      Promise.resolve(searchParams).then((params) => {
        setSelectedMovieId(params?.movie || null);
      });
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/movies");
        if (res.ok) {
          const data = await res.json();
          setAllMovies(data);
        }
      } catch (error) {
        console.error("Impossible de joindre le serveur NestJS :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);


  const isAuthenticated = (e: React.MouseEvent, targetHref: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowToast(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  if (loading || isLoggedIn === null) {
    return (
      <main className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <p className="italic text-secondary">Chargement de l'application...</p>
      </main>
    );
  }

  if (allMovies.length === 0) {
    return (
      <main className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <p className="italic text-secondary">Aucun film disponible dans la base MongoDB.</p>
      </main>
    );
  }

  const currentMovieId = selectedMovieId || allMovies[0]?._id;
  const selectedMovie = allMovies.find((movie) => movie._id === currentMovieId) ?? allMovies[0];

  return (
    <main className="min-vh-100 bg-dark text-white position-relative">
      
     
      <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1100, marginTop: "90px" }}>
<div className={`toast align-items-center text-white bg-danger border-0 shadow ${showToast ? "show" : "hide"}`} role="alert">
  <div className="d-flex">
    <div className="toast-body d-flex align-items-center gap-2">
      <i className="bi bi-exclamation-triangle-fill fs-5"></i>
      <span>Connexion requise ! Vous devez être connecté pour voir les détails d'un film.</span>
    </div>
    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
  </div>
</div></div>

      <section className="container py-5">
        
        
        {isLoggedIn ? (
          <div className="pt-5">
            <div className="row g-5 align-items-start mt-2">
              <div className="col-12 col-lg-4">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  width={500}
                  height={750}
                  className="img-fluid rounded-3 object-fit-cover w-100"
                  style={{ maxHeight: "440px" }}
                  priority
                />
              </div>

    <div className="col-12 col-lg-8">
      <Link href="/" className="text-warning fw-bold text-decoration-none">
        Retour
      </Link>
<h1 className="display-4 fw-bold mb-4">{selectedMovie.title}</h1>
<p className="lead text-light">{selectedMovie.overview || "Aucun synopsis disponible."}</p>
<div className="my-4">
  <div className="mb-2 text-light">
    <strong>Date de sortie :</strong> {selectedMovie.release_date || "Inconnue"}
  </div>
  <div className="mb-2 text-light">
  <strong>Note TMDB :</strong> {selectedMovie.vote_average?.toFixed(1) ?? "0"}/10
</div>
  </div>
         <div className="d-flex flex-wrap gap-3">
         <a href="#" onClick={(e) => isAuthenticated(e, "#")} className="btn btn-danger fw-bold px-4 py-2">Regarder</a>
        <a href="#" onClick={(e) => isAuthenticated(e, "#")} className="btn btn-outline-light fw-bold px-4 py-2">Télécharger</a>
        </div>
        </div>
            </div>
          </div>
        ) : (
          
  <div className="pt-5 text-center my-5 py-5 border border-secondary rounded bg-black bg-opacity-25">
  <i className="bi bi-lock-fill text-danger display-1 mb-3"></i>
  <h2 className="fw-bold">Contenu Verrouillé</h2>
  <p className="text-secondary col-md-6 mx-auto">
    Vous devez créer un compte ou vous connecter pour accéder aux fiches détaillées, regarder ou télécharger les films.
  </p>
  <Link href="/login" className="btn btn-danger fw-bold px-4 py-2 mt-2">
    Se connecter maintenant
  </Link>
</div>)}

    
<div className="row g-4 mt-5">
  <h3 className="fs-4 fw-bold mb-0">Tous nos films</h3>
          {allMovies.map((movie) => {const movieUrl = `/movies?movie=${movie._id}`;
            return (
              <div key={movie._id} className="col-12 col-sm-6 col-lg-3">
                <Link href={movieUrl}  onClick={(e) => isAuthenticated(e, movieUrl)}
                  className={`card h-100 overflow-hidden text-white text-decoration-none ${
                    isLoggedIn && movie._id === selectedMovie._id
                      ? "border-warning bg-black"
                      : "border-secondary bg-dark"
                  }`}
                  style={{ cursor: "pointer" }}>
                    
<Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}
                    width={500}
                    height={750}
                    className="card-img-top object-fit-cover"
                    style={{ height: "280px" }}
                  />
  <div className="card-body">
    <h2 className="card-title fs-6 fw-bold mb-2">{movie.title}</h2>
    <p className="card-text small text-secondary mb-0">
      Note : {movie.vote_average?.toFixed(1)}/10
    </p>
  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
