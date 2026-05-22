"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroMovie } from "@/data/homeMovies";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section 
className="position-relative d-flex align-items-center text-white" 
style={{ 
   minHeight: "100vh",  
   padding: "120px 6% 70px",   
   backgroundImage: `linear-gradient(90deg, #101014 0%, rgba(16, 16, 20, 0.82) 42%, rgba(16, 16, 20, 0.2) 100%), linear-gradient(0deg, #101014 0%, rgba(16, 16, 20, 0.1) 55%), url(${heroMovie.image})`,  
   backgroundPosition: "center", 
   backgroundSize: "cover"
      }} >
<div className="position-relative col-12 col-lg-7 col-xl-6">
  <p className="mb-2 text-warning fw-bold text-uppercase">Bienvenue sur Rotten Movies</p>
  <h1 className="display-3 fw-bold lh-1">Découvrez vos prochains films</h1>
  <p className="lead my-4 text-light">
     Retrouvez des films populaires, les nouveautés, les genres que vous aimez et les notes données par le public
  </p>

        <div className="d-flex flex-wrap gap-3">
          <Link href="#popular" className="btn btn-danger fw-bold px-4 py-2">
            Voir les films
          </Link>
          
          {isLoggedIn === false && (
            <Link href="/login" className="btn btn-outline-light fw-bold px-4 py-2">
              Se connecter </Link>
          )}
        </div>
      </div>
    </section>
  );
}
