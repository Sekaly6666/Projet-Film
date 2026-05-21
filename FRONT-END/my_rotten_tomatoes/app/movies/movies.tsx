import Image from "next/image";
import Link from "next/link";


type Movie = {
  _id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

type MoviesPageProps = {
  searchParams?: Promise<{
    movie?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  let allMovies: Movie[] = [];
  try {
    const res = await fetch('http://localhost:3001/movies', { cache: 'no-store' });
    if (res.ok) {
      allMovies = await res.json();
    }
  } catch (error) {
    console.error("Impossible de joindre le serveur NestJS :", error);
  }

  
  if (allMovies.length === 0) {
    return (
      <main className="min-vh-100 bg-dark text-white d-flex align-items-center justify-center">
        <p className="italic text-secondary">Aucun film disponible dans la base MongoDB.</p>
      </main>
    );
  }

  const selectedMovieId = (await searchParams)?.movie;
  const selectedMovie =
    allMovies.find((movie) => movie._id === selectedMovieId) ?? allMovies[0];

  return (
    <main className="min-vh-100 bg-dark text-white">
      <section className="container py-5">
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
                <a href="#" className="btn btn-danger fw-bold px-4 py-2">
                  Regarder
                </a>
                <a href="#" className="btn btn-outline-light fw-bold px-4 py-2">
                  Télécharger
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="row g-4 mt-4">
          {allMovies.map((movie) => (
            <div key={movie._id} className="col-12 col-sm-6 col-lg-3">
              <Link
                href={`/movies?movie=${movie._id}`}
                className={`card h-100 overflow-hidden text-white text-decoration-none ${
                  movie._id === selectedMovie._id
                    ? "border-warning bg-black"
                    : "border-secondary bg-dark"
                }`}
              >
                <Image
                  src={ `https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
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
          ))}
        </div>
      </section>
    </main>
  );
}
