import Link from "next/link" ;

export default function LoginPage() {

  return (

    <main

      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5 text-white"
      style={{  backgroundImage: `  linear-gradient(90deg, rgba(16, 16, 20, 0.9), rgba(16, 16, 20, 0.55)), url("https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg") `, backgroundPosition: "center", backgroundSize: "cover", }}>

      <section className="w-100 rounded-3 p-4 p-md-5 bg-dark bg-opacity-75" style={{ maxWidth: "430px" }}>

        <Link href="/" className="text-danger fs-4 fw-bold text-decoration-none">

          Rotten Movies Tomatoes
        </Link>



        <h1 className="mt-4 mb-2 fw-bold">Connexion</h1>
        <p className="text-light">
          Connectez-vous pour noter les films et ajouter vos favoris.
        </p>

        <form className="d-flex flex-column gap-3 mt-4">

          <div>
            <label htmlFor="email" className="form-label fw-bold"> E-mail </label>
            <input id="email" type="email" placeholder="votre@email.com" className="form-control bg-black text-white border-secondary py-3" />

          </div>

          <div>
            <label htmlFor="password" className="form-label fw-bold"> Mot de passe </label>
            <input  id="password"  type="password"  placeholder="Votre mot de passe" className="form-control bg-black text-white border-secondary py-3"  />
          </div>

          <button type="submit" className="btn btn-danger fw-bold py-3"> Se connecter </button>
        </form>

        <p className="mt-4 mb-0 text-light">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-warning fw-bold text-decoration-none">
            Creer un compte
          </Link>
        </p>

      </section>
    </main>
  );
}
