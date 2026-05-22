"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const isAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      setIsLoggedIn(!!token);
      
if (user) {
  try {
          
    const userConnected = JSON.parse(user);
    setUserName(userConnected.name || userConnected.username || "username");
    setUserRole(userConnected.role || "user");
  } catch {
    setUserName(user);
    setUserRole("user");
   }
}
    };

    isAuth();

    window.addEventListener("storage", isAuth);
    return () => window.removeEventListener("storage", isAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="navbar navbar-expand bg-dark bg-opacity-75 fixed-top px-3 px-md-5 py-3">
      <Link href="/" className="navbar-brand fw-bold fs-4 text-danger">
        My Rotten Tomatoes
      </Link>
      <nav className="navbar-nav ms-auto flex-row align-items-center gap-3 gap-md-4">
        {isLoggedIn !== null && (
          <>
            {isLoggedIn ? (
              
 <div className="dropdown">
  <button
    className="btn btn-outline-light btn-sm px-3 py-2 dropdown-toggle d-flex align-items-center gap-2 rounded-pill shadow-sm"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false">
    <i className="bi bi-person-circle"></i>
  <span>{userName}</span>
  </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow mt-2">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" href="/settings">
                      <i className="bi bi-gear-fill text-muted"></i>
                      <span>Paramètres</span>
                    </Link>
                  </li>
          <li>
                    <Link className="dropdown-item d-flex align-items-center gap-2" href="/admin/dashboard">
                      <i className="bi bi-gear-fill text-muted"></i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item text-danger d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Déconnexion</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
             
              <>
                <Link 
                  href="/login" 
                  className="nav-link text-light px-2 d-flex align-items-center gap-2 border border-transparent rounded"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Connexion</span>
                </Link>
                <Link 
                  href="/register" 
                  className="btn btn-danger btn-sm px-3 py-2 d-flex align-items-center gap-2 rounded-pill shadow-sm"
                >
                  <i className="bi bi-person-plus-fill"></i>
                  <span>Inscription</span>
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
