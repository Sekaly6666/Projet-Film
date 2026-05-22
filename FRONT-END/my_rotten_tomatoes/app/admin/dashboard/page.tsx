"use client";
import Link from 'next/link';
import { Film, BarChart3, LogOut, ArrowUpRight, RefreshCw, Star, ShieldAlert, Home, Trash2, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { FaAppleAlt, FaPeopleArrows } from 'react-icons/fa';

type Movie = {
  _id: string;
  title: string;
  release_date?: string;
  vote_average?: number;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [currentAdminId, setCurrentAdminId] = useState<string>('');

  const [tmdbId, setTmdbId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(false);

 
  useEffect(() => {
    const loggedInUserStr = localStorage.getItem('user');
    if (loggedInUserStr) {
      try {
        const parsed = JSON.parse(loggedInUserStr);
        setCurrentAdminId(parsed.username || parsed.username || '');
      } catch (e) {
        console.error("Impossible de décoder l'utilisateur connecté", e);
      }
    }
  }, []);

  
  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const res = await fetch('http://localhost:3001/movies', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMovies(data);
      }
    } catch (error) {
      console.error("Impossible de récupérer les films :", error);
    } finally {
      setLoadingMovies(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('http://localhost:3001/users', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Impossible de récupérer les utilisateurs :", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  
  useEffect(() => {
    if (activeTab === 'movies') {
      fetchMovies();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);


  const DeleteMovie = async (id: string, title: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer définitivement le film "${title}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/movies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
        setMessage({ type: 'success', text: `Le film "${title}" a été supprimé avec succès.` });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la suppression");
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Erreur réseau lors de la suppression." });
    }
  };

  const handleImportMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmdbId.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('http://localhost:3001/movies/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tmdbId: tmdbId.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'importation");
      }

      setMessage({ 
        type: 'success', 
        text: `Le film "${data.title}" a été importé avec succès dans MongoDB !` 
      });
      setTmdbId(''); 
      fetchMovies(); 
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || "Impossible de joindre le serveur NestJS." 
      });
    } finally {
      setLoading(false);
    }
  };

  
  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'Put', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        setMessage({ type: 'success', text: "Rôle mis à jour avec succès." });
      } else {
        throw new Error("Erreur serveur lors de la mise à jour");
      }
    } catch (error) {
      setMessage({ type: 'error', text: "Impossible de modifier le rôle." });
    }
  };

  const DeleteUser = async (userId: string, userEmail: string) => {
    if (userId === currentAdminId) {
      alert("Action impossible : Vous ne pouvez pas supprimer votre propre compte administrateur !");
      return;
    }

    if (!confirm(`Voulez-vous vraiment supprimer définitivement le compte de ${userEmail} ?`)) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });

  if (res.ok) {
    setUsers(prev => prev.filter(u => u._id !== userId));
    setMessage({ type: 'success', text: "L'utilisateur a été supprimé avec succès." });
  } else {
    throw new Error("Erreur serveur lors de la suppression");
  }
} catch (error) {
  setMessage({ type: 'error', text: "Erreur lors de la suppression de l'utilisateur." });
}
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <aside className="w-64 bg-red-950 text-white flex flex-col hidden md:flex shadow-2xl z-20">
        <div className="p-6 border-b border-red-900/50 flex items-center gap-3">
          <FaAppleAlt className="text-red-500 text-xl" />
          <span className="font-bold text-lg tracking-tight">My Rotten Tomatoes</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-3 flex flex-col items-center">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'stats' 
                ? 'bg-red-800 text-white shadow-lg' 
                : 'text-red-200 hover:bg-white/5 hover:text-white'
            }`}
            style={{ borderRadius: '12px' }} 
          >
            <BarChart3 className="w-5 h-5 shrink-0" />
            <span className="text-sm">Statistiques & Notes</span>
          </button>
          
  <button 
  onClick={() => setActiveTab('movies')}
  className={`w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
    activeTab === 'movies' ? 'bg-red-800 text-white shadow-lg' 
                : 'text-red-200 hover:bg-white/5 hover:text-white'}`}
            style={{ borderRadius: '12px' }}>

<Film className="w-5 h-5 shrink-0" />
<span className="text-sm">Gestion des Films</span>
</button>
          
    <button onClick={() => setActiveTab('users')}
            className={`w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'users' ? 'bg-red-800 text-white shadow-lg' 
                : 'text-red-200 hover:bg-white/5 hover:text-white'}`}
            style={{ borderRadius: '12px' }} >
  <FaPeopleArrows className="w-5 h-5 shrink-0" />
  <span className="text-sm">Utilisateurs & Droits</span>
  </button>

  <div className="w-[calc(100%-2rem)] my-2 border-t border-red-900/40"></div>
  <Link href="/" className="w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl 
  font-medium transition-all text-red-200 hover:bg-white/5 hover:text-white text-decoration-none"
            style={{ borderRadius: '12px' }}>

            <Home className="w-5 h-5 shrink-0" />
            <span className="text-sm">Retour au site</span>
  </Link>
        </nav>

        <div className="p-4 border-t border-red-900/50 bg-red-950/80 text-xs text-red-200 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Admin</p>
            <p className="opacity-60">admin@tomates.com</p>
          </div>
          <span className="bg-green-500 w-2.5 h-2.5 rounded-full ring-4 ring-green-500/20"></span>
        </div>
      </aside>

    
      <div className="flex-1 flex flex-col overflow-y-auto">       
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {activeTab === 'stats' && "Tableau de bord des statistiques"}
              {activeTab === 'movies' && "Catalogue & Ajout TMDB"}
              {activeTab === 'users' && "Modération des comptes"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Espace d'administration du site</p>
          </div>
          <button className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-red-600 transition duration-200 flex items-center justify-center shadow-sm" aria-label="Déconnexion">
            <LogOut className="w-5 h-5 text-slate-600" />
          </button>
        </header>
       
        <main className="p-8 max-w-7xl w-full mx-auto space-y-8">         
          
          {message && (
            <div className={`p-4 rounded-xl text-sm font-medium border ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              {message.text}
            </div>
          )}

        
          {activeTab === 'stats' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[140px]">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Note Moyenne Générale</p>
                  <p className="text-4xl font-black text-white my-2">7.8 <span className="text-sm font-normal text-slate-500">/10</span></p>
                  <div className="flex items-center gap-1.5 self-start text-xs font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-900/50">
                    <BarChart3 className="w-3.5 h-3.5" /> <span>Stable ce mois</span>
                  </div>
                </div>
                
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[140px]">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Critiques Rédigées</p>
                  <p className="text-4xl font-black text-white my-2">1 420</p>
                  <div className="flex items-center gap-1.5 self-start text-xs font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-900/50">
                    <ArrowUpRight className="w-3.5 h-3.5" /> <span>+14% d'avis</span>
                  </div>
                </div>
                
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[140px]">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Films Référencés</p>
        <p className="text-4xl font-black text-white my-2">{movies.length || 348}</p>
        <div className="flex items-center gap-1.5 self-start text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/50">
          <RefreshCw className="w-3.5 h-3.5 " /> <span>Synchronisé avec TMDB</span>
          </div>
        </div>
      </div>
            </>
          )}

          
          {activeTab === 'movies' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Importer un film via TMDB</h3>
                <p className="text-sm text-slate-400 mb-4">Entrez l'ID numérique du film trouvé sur TMDB pour l'ajouter automatiquement à votre base de données.</p>
                
                <form onSubmit={handleImportMovie} className="flex gap-3 max-w-xl">
                  <input type="text"
                    disabled={loading}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 transition"
                    placeholder="Ex d'ID : 272 (Batman Begins), 157..."
                    value={tmdbId}
                    onChange={(e) => setTmdbId(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-md shadow-red-500/10 flex items-center gap-2 whitespace-nowrap"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Rechercher & Importer</span>
                  </button>
                </form>
              </div>

             
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Catalogue des films enregistrés ({movies.length})</h3>

                {loadingMovies ? (
                  <div className="flex items-center gap-2 text-slate-400 py-6 italic justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-red-800" />
                    <span>Récupération des films de la base MongoDB...</span>
                  </div>
                ) : movies.length === 0 ? (
                  <p className="text-slate-400 py-4 text-center italic">Aucun film enregistré pour le moment.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                          <th className="py-3 px-4">Titre du film</th>
                          <th className="py-3 px-4">Date de sortie</th>
                          <th className="py-3 px-4">Note</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 text-sm">
                        {movies.map((movie) => (
                          <tr key={movie._id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">{movie.title}</td>
                            <td className="py-3.5 px-4 text-slate-500">{movie.release_date || "Inconnue"}</td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-lg border border-amber-200 text-xs">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                {movie.vote_average?.toFixed(1) || "0.0"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => DeleteMovie(movie._id, movie.title)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600 px-3 py-1.5 rounded-xl transition duration-200 shadow-sm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Supprimer</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        
  {activeTab === 'users' && (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
   
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Utilisateurs enregistrés ({users.length})</h3>
        <p className="text-xs text-slate-400 mt-0.5">Modération des accès et des rôles de l'application</p>
      </div>
      <div className="p-2 bg-slate-50 rounded-xl">
        <FaPeopleArrows className="w-5 h-5 text-slate-500" />
      </div>
    </div>

    {loadingUsers ? (
      <div className="flex flex-col items-center justify-center gap-2 text-slate-400 py-12 italic">
        <Loader2 className="w-6 h-6 animate-spin text-red-800" />
        <span className="text-sm">Récupération des comptes, veuillez patienter...</span>
      </div>
    ) : users.length === 0 ? (
      <div className="text-center py-12 text-slate-400 italic">
        <p>Aucun utilisateur trouvé dans la base de données.</p>
      </div>
    ) : (
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
              <th className="py-3 px-4">Nom d'utilisateur</th>
              <th className="py-3 px-4">Adresse Email</th>
              <th className="py-3 px-4">Rôle</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {users.map((user) => {
              
              const Mine = user._id === currentAdminId;
              
              return (
                <tr 
                  key={user._id} 
                  className={`hover:bg-slate-50/80 transition duration-150 ${
                    Mine ? 'bg-amber-50/30 hover:bg-amber-50/50' : ''
                  }`}
                >
                  
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {user.username || "Non renseigné"}
                  </td>

                  
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <span>{user.email}</span>
                      {Mine && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide border border-amber-200">
                          Moi
                        </span>
                      )}
                    </div>
                  </td>

                 
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex font-bold px-2.5 py-0.5 rounded-lg text-xs border ${
                      user.role === 'admin' 
                        ? 'bg-purple-50 text-purple-700 border-purple-200' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {user.role ? user.role.toUpperCase() : 'USER'}
                    </span>
                  </td>

                 
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex justify-end items-center gap-2">                     
                      <button
                        onClick={() => handleToggleRole(user._id, user.role)}
                        title={`Passer le rôle à ${user.role === 'admin' ? 'user' : 'admin'}`}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 px-3 py-1.5 rounded-xl transition duration-150"
                      >
                        Changer rôle
                      </button>

                      
                      <button
                        onClick={() => DeleteUser(user._id, user.email)}
                        disabled={Mine}
                        title={Mine ? "Vous ne pouvez pas supprimer votre propre session" : "Supprimer ce compte"}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition duration-150 shadow-sm ${
                          Mine 
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed border-none shadow-none' 
                            : 'text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


        </main>
      </div>
    </div>
  );
}
