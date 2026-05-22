"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
           password_confirm: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
       const errorMessage = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(errorMessage || "Une erreur est survenue lors de l'inscription.");
      }
      router.push("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5 text-white"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(16, 16, 20, 0.9), rgba(16, 16, 20, 0.55)), url("https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="w-100 rounded-3 p-4 p-md-5 bg-dark bg-opacity-75" style={{ maxWidth: "430px" }}>
        <Link href="/" className="text-danger fs-4 fw-bold text-decoration-none">
          Rotten Movies Tomatoes
        </Link>

        <h1 className="mt-4 mb-2 fw-bold">Inscription</h1>
        <p className="text-light">
          Créer un compte pour commenter, noter et garder vos films préférés.
        </p>

        {error && <div className="alert alert-danger p-2 small">{error}</div>}

        <form className="d-flex flex-column gap-3 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="form-label fw-bold">Nom</label>
            <input
              id="name"
              type="text"
              placeholder="Votre nom"
              className="form-control bg-black text-white border-secondary py-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label fw-bold">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="form-control bg-black text-white border-secondary py-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label fw-bold">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              className="form-control bg-black text-white border-secondary py-3"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirmation de passe</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirmez votre mot de passe"
              className="form-control bg-black text-white border-secondary py-3"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger fw-bold py-3" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <p className="mt-4 mb-0 text-light">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-warning fw-bold text-decoration-none">
            Se connecter
          </Link>
        </p>
      </section>
    </main>
  );
}
