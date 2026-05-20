import Image  from "next/image";
import   Link from  "next/link";
 import type {Movie } from  "@/data/homeMovies";



type  MovieCardProps= { movie: Movie; };


export default  function MovieCard ({movie }: MovieCardProps ){

  return (
    
    <Link href={`/movies?movie= ${ movie.id}`} className="card h-100 overflow-hidden border-secondary bg-dark text-white text-decoration-none" >
      <Image src={movie.image } alt={ movie.title} width={500 } height ={ 750} className="card-img-top object-fit-cover" style={{ height: "330px" }} />

      <div className="card-body d-flex flex-column gap-2">

        <h3 className="card-title mb-0 fs-6 fw-bold"> { movie.title}</h3>
        <p className="card-text mb-0 small text-secondary"> {movie.genre } - { movie.year}</p>
        <span className="mt-auto text-warning fw-bold">{movie.rating }/10 </span>

      </div>

    </Link>
  );
  
}
