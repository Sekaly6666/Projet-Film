import Link from "next/link";
import Image from "next/image";

interface Movie {
  _id?: string;
  id?: number;
  title: string;
  overview?: string;
  description?: string;
  poster_path?: string;
  image?: string;
  vote_average?: number;
  rating?: number;
  release_date?: string;
  year?: number;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
 
  const releaseYear = movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A");
  const movieOverview = movie.overview || movie.description || "Aucune description disponible.";
  
  const movieRating = movie.rating || movie.vote_average || 0;
  const imageUrl = movie.image 
    ? movie.image
    : movie.poster_path 
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  return (
    <Link 
      href={`/movies?movie=${movie._id || movie.id}`} 
      className="card h-100 bg-secondary text-white text-decoration-none shadow-sm hover-border-warning"
      style={{ display: "block", border: "1px solid #444", borderRadius: "8px", overflow: "hidden" }}>
    
      <div style={{ position: "relative", height: "330px", width: "100%" }}>
        <Image src={imageUrl} alt={movie.title} fill 
          sizes="(max-width: 768px) 100vw, 300px"
          className="card-img-top object-cover" 
          priority />
      </div>

      <div className="card-body p-3 d-flex flex-column gap-2" style={{ backgroundColor: "#212529" }}>
        <h3 className="card-title h6 fw-bold mb-0 text-truncate">
          {movie.title}
        </h3>
        
        <p className="card-text mb-0 small text-muted">
          Année : {releaseYear}
        </p>
        
        <p className="card-text small text-light mb-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: "13px" }}>
          {movieOverview}
        </p>

        <span className="badge bg-warning text-dark fw-bold align-self-start">
          {movieRating.toFixed(1)}/10
        </span>
      </div>
    </Link>
  );
}
