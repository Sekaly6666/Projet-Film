
 import Link from  "next/link" ;

export default function   Header ( ){

  return (

    <header className="navbar navbar-expand bg-dark bg-opacity-75 fixed-top px-3 px-md-5 py-3">
      <Link href=" /" className="navbar-brand fw-bold fs-4 text-danger"> My Rotten Tomatoes </Link>

       <nav className="navbar-nav ms-auto flex-row gap-3 gap-md-4">
         <Link  href="/login"   className="nav-link text-light px-0"> Connexion </Link>
        <Link  href=" /register"   className="nav-link text-light px-0"> Inscription </Link>
      </nav>

    </header>
  );
}
