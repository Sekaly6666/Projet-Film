import Link from  "next/link" ;

export default function   Header ( ){

  return (

    <header className="navbar navbar-expand bg-dark bg-opacity-75 fixed-top px-3 px-md-5 py-3">
      <Link href=" /" className="navbar-brand fw-bold fs-4 text-danger"> My Rotten Tomatoes </Link>

       <nav className="navbar-nav ms-auto flex-row gap-3 gap-md-4">
         <Link href="/login" className="nav-link text-light px-2 d-flex align-items-center gap-2 border border-transparent rounded hover-bg-dark">
    <i className="bi bi-box-arrow-in-right"></i>
    <span>Connexion</span>
  </Link>
        <Link href="/register" className="btn btn-danger btn-sm px-3 py-2 d-flex align-items-center gap-2 rounded-pill shadow-sm">
    <i className="bi bi-person-plus-fill"></i>
    <span>Inscription</span>
  </Link>
      </nav>

    </header>
  );
}
