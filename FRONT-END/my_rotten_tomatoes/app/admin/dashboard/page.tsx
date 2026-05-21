"use client";
import Link from 'next/link';
import { Film, BarChart3, LogOut, ArrowUpRight, RefreshCw, Star, ShieldAlert, Home } from 'lucide-react';
import React, { useState } from 'react';
import { FaAppleAlt, FaPeopleArrows } from 'react-icons/fa';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  

  const [tmdbId, setTmdbId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);


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
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || "Impossible de joindre le serveur NestJS." 
      });
    } finally {
      setLoading(false);
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
                ? 'bg-red-800 text-white shadow-lg !rounded-xl' 
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
              activeTab === 'movies' 
                ? 'bg-red-800 text-white shadow-lg !rounded-xl' 
                : 'text-red-200 hover:bg-white/5 hover:text-white'
            }`}
            style={{ borderRadius: '12px' }}
          >
            <Film className="w-5 h-5 shrink-0" />
            <span className="text-sm">Gestion des Films</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'users' 
                ? 'bg-red-800 text-white shadow-lg !rounded-xl' 
                : 'text-red-200 hover:bg-white/5 hover:text-white'
            }`}
            style={{ borderRadius: '12px' }} 
          >
            <FaPeopleArrows className="w-5 h-5 shrink-0" />
            <span className="text-sm">Utilisateurs & Droits</span>
          </button>

          <div className="w-[calc(100%-2rem)] my-2 border-t border-red-900/40"></div>
          <Link 
            href="/" 
            className="w-[calc(100%-1rem)] mx-auto flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-red-200 hover:bg-white/5 hover:text-white text-decoration-none"
            style={{ borderRadius: '12px' }}
          >
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
        <header className="bg-white border-b border-slate-100 px-8 py-2 flex justify-between items-center sticky top-0 z-10 shadow-sm">
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
                  <p className="text-4xl font-black text-white my-2">348</p>
                  <div className="flex items-center gap-1.5 self-start text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700/50">
                    <RefreshCw className="w-3.5 h-3.5 " /> <span>Synchronisé avec TMDB</span>
                  </div>
                </div>
              </div>

            
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-3 bg-red-950 border-b border-red-900/20 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-white text-base">Dernières notes attribuées par le public</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500 tracking-wider">
                        <th className="px-6 py-4">Film</th>
                        <th className="px-6 py-4">Utilisateur</th>
                        <th className="px-6 py-4">Note</th>
                        <th className="px-6 py-4">Commentaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900">Inception</td>
                        <td className="px-6 py-4">LucasM</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-lg w-max">
                            <Star className="w-3.5 h-3.5 fill-amber-500" /> 9/10
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 italic">"Un chef d'œuvre absolu, le scénario est parfait !"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

         
          {activeTab === 'movies' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-1">Importer un film via TMDB</h3>
                <p className="text-sm text-slate-400 mb-5">Entrez l'ID numérique du film trouvé sur TMDB pour l'ajouter automatiquement à votre base de données.</p>
                
                {message && (
                  <div className={`p-4 mb-4 rounded-xl text-sm font-medium border ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleImportMovie} className="flex gap-3 max-w-xl">
                  <input 
                    type="text" 
                    value={tmdbId}
                    onChange={(e) => setTmdbId(e.target.value)}
                    disabled={loading}
                    placeholder="Ex d'ID : 272 (Batman Begins), 157336 (Interstellar)..." 
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-slate-50 focus:bg-white transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={loading || !tmdbId}
                    className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/10 text-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Rechercher & Importer'}
                  </button>
                </form>
              </div>
            </div>
          )}

          
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaPeopleArrows className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-white text-base">Liste des utilisateurs inscrits</h3>
                </div>
              </div>
              <div className="p-6 text-slate-400 italic text-sm text-center">
                Module de modération des comptes et des droits opérationnel.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
