"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
     
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
      
        const errorMessage = Array.isArray(data.message) ? data.message[0] : data.message;
        throw new Error(errorMessage || "Identifiants incorrects.");
      }
const tokenValue = data.access_token || data.token;
      const roleValue = data.user?.role || "user";
      
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `token=${tokenValue}; path=/; max-age=86400; SameSite=Strict; Secure`;
      document.cookie = `role=${roleValue}; path=/; max-age=86400; SameSite=Strict; Secure`;

      router.push("/"); 

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5 text-white"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(16, 16, 20, 0.9), rgba(16, 16, 20, 0.55)), url("https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg")`,backgroundPosition: "center", backgroundSize: "cover", }} >

      <section className="w-100 rounded-3 p-4 p-md-5 bg-dark bg-opacity-75" style={{ maxWidth: "430px" }}>
        <Link href="/" className="text-danger fs-4 fw-bold text-decoration-none"> Rotten Movies Tomatoes</Link>

        <h1 className="mt-4 mb-2 fw-bold">Connexion</h1>
        <p className="text-light"> Connectez-vous pour noter les films et ajouter vos favoris </p>

     
        {error && <div className="alert alert-danger p-2 small">{error}</div>}

        <form className="d-flex flex-column gap-3 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form-label fw-bold">E-mail</label>
            <input id="email"  type="email"  placeholder="votre@email.com"  className="form-control bg-black text-white border-secondary py-3"  value={formData.email}  onChange={handleChange}  required/>
          </div>

          <div>
            <label htmlFor="password" className="form-label fw-bold">Mot de passe</label>
            <input id="password" type="password" placeholder="Votre mot de passe" className="form-control bg-black text-white border-secondary py-3" value={formData.password} onChange={handleChange}   required />
          </div>

          <button type="submit" className="btn btn-danger fw-bold py-3" disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 mb-0 text-light">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-warning fw-bold text-decoration-none">  Créer un compte  </Link>
        </p>
      </section>
    </main>
  );
}
