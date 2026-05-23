
"use client";

import { usePathname } from "next/navigation";

const footerColumns= [

  {
    title: "Découvrez-nous",
    links: ["À propos", "Films populaires", "Nouveautés", "Top notes"],
  },

  {
    title: "Besoin d'aide",
    links: ["Aide en ligne", "Contact", "Conditions d'utilisation", "Confidentialité"],
  },

  {
    title: "Rotten Movies",
    links: ["Films", "Séries", "Genres", "Commentaires"],
  },

  {
    title: "Nos programmes",
    links: ["Action", "Comédie", "Science-fiction", "Animation"],
  },

  {
    title: "Nos offres",
    links: ["Regarder", "Télécharger", "Favoris", "Compte utilisateur"],
  },
  

];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
<footer className="bg-dark text-white px-3 px-md-5 py-5 mt-auto">
  <div className="container-fluid">
    <div className="mb-4 text-danger fs-4 fw-bold"> My Rotten Tomatoes</div>

  <div className="row g-4">
    {footerColumns.map((column) => (
      <div key={column.title} className="col-12 col-sm-6 col-lg">
        <h3 className="fs-6 fw-bold mb-3"> {column.title}</h3>

        <div className="d-grid gap-2">
          {column.links.map((link) => (
            <a href="#" key={link} className="text-secondary text-decoration-none">
              {link}
            </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
