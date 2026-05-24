"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {  _id?: string; id?: string;username?: string; email?: string;role?: string;};

export default function SettingsPage() {

  const [ userId,setUserId]= useState("");
  const [username, setUsername] =useState("");
    const [ email,setEmail] =useState("");
  const [ password, setPassword] = useState("");
  const  [confirmPassword,setConfirmPassword] =useState( " ");

  const [ message,setMessage]= useState( "" ) ;
  const  [error, setError]=useState("");
  const [ loading, setLoading]= useState(false ) ;

  useEffect(() =>{
    const storedUser= localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    try {
      const user: User = JSON.parse(storedUser);

      setUserId(user._id || user.id || "" ) ;
      setUsername(user.username|| "");
      setEmail(user.email || "");
    } catch {
      return;
    }

  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {event.preventDefault() ;  setMessage("");setError("" );

    if (!userId) {
      return;
    }

    if (password && password !== confirmPassword) {
      setError( "Les mots de passe ne correspondent pas ");
      return;
    }

    const body: { username: string; email: string; password?: string } = { username: username.trim(), email: email.trim(), };

    if (password.trim()) {
      body.password= password.trim();
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Modification impossible.");
      }

      localStorage.setItem("user", JSON.stringify(data));
      setPassword("");
      setConfirmPassword("");
      setMessage("Informations mises a jour.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center text-white px-3 py-5"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(16, 16, 20, 0.9), rgba(16, 16, 20, 0.55)), url("https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="w-100 rounded-3 p-4 p-md-5 bg-dark bg-opacity-75" style={{ maxWidth: "430px" }}>
        <Link href="/" className="text-danger fs-4 fw-bold text-decoration-none">
          My Rotten Tomatoes
        </Link>

        <h3 className="mt-4 mb-2 fw-bold">Modifiez vos informations.</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 mt-4">
          {message && <div className="alert alert-success p-2 small">{message}</div>}
          {error && <div className="alert alert-danger p-2 small">{error}</div>}

          <div>
            <label htmlFor="username" className="form-label fw-bold">Nom</label>
            <input
              id="username"
              type="text"
              className="form-control bg-black text-white border-secondary py-3"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label fw-bold">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-control bg-black text-white border-secondary py-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label fw-bold">Nouveau mot de passe</label>
            <input
              id="password"
              type="password"
              className="form-control bg-black text-white border-secondary py-3"
              placeholder="Laissez vide pour ne pas changer"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirmation</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control bg-black text-white border-secondary py-3"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger fw-bold py-3" disabled={loading}>
            {loading ? "Enregistrement..." : "Mettre à jour"}
          </button>

          <Link href="/" className="btn btn-outline-light fw-bold py-3">
            Retour
          </Link>
        </form>
      </section>
    </main>
  );
}
