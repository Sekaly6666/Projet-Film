import Image from "next/image";
import Link from "next/link";
import { allMovies } from "@/data/homeMovies";

type MoviesPageProps = {
  searchParams?: Promise<{
    movie?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const selectedMovieId = Number((await searchParams)?.movie);
  const selectedMovie =
    allMovies.find((movie) => movie.id === selectedMovieId) ?? allMovies[0];

  return (
    <main className="min-vh-100 bg-dark text-white">
      <section className="container py-5">
        <div className="pt-5">
          <div className="row g-5 align-items-start mt-2">
            <div className="col-12 col-lg-4">
              <Image
                src={selectedMovie.image}
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
              <p className="lead text-light">{selectedMovie.description}</p>

              <div className="my-4">
                <p className="mb-2 text-light">
                  <strong>Genre :</strong> {selectedMovie.genre}
                </p>
                <p className="mb-2 text-light">
                  <strong>Date de sortie :</strong> {selectedMovie.releaseDate}
                </p>
                <p className="mb-2 text-light">
                  <strong>Publie par admin :</strong>{" "}
                  {selectedMovie.adminPublicationDate}
                </p>
                <p className="mb-2 text-light">
                  <strong>Note :</strong> {selectedMovie.rating}/10
                </p>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <a href="#" className="btn btn-danger fw-bold px-4 py-2">
                  Regarder
                </a>
                <a href="#" className="btn btn-outline-light fw-bold px-4 py-2">
                  Telecharger
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {allMovies.map((movie) => (
            <div key={movie.id} className="col-12 col-sm-6 col-lg-3">
              <Link
                href={`/movies?movie=${movie.id}`}
                className={`card h-100 overflow-hidden text-white text-decoration-none ${
                  movie.id === selectedMovie.id
                    ? "border-warning bg-black"
                    : "border-secondary bg-dark"
                }`}
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="card-img-top object-fit-cover"
                  style={{ height: "280px" }}
                />
                <div className="card-body">
                  <h2 className="card-title fs-6 fw-bold mb-2">{movie.title}</h2>
                  <p className="card-text small text-secondary mb-0">
                    {movie.genre} - {movie.year}
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
