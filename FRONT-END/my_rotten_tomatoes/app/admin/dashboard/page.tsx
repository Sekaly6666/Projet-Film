"use client";
import { Film, BarChart3 } from 'lucide-react';
import React, { useState } from 'react';
import { FaAppleAlt, FaPeopleArrows } from 'react-icons/fa';
import { GoStarFill } from 'react-icons/go';

export default function AdminDashboard() {
  
  const [activeTab, setActiveTab] = useState('stats');

  return (

    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
        
   {/* La barre latérale de gauche*/}   
      <aside className="w-64 bg-red-900 text-white flex flex-col hidden md:flex shadow-xl">
        <div className="p-6 border-b border-red-850 flex items-center space-x-2">
          <span className="text-2xl"><FaAppleAlt /></span>
          <span className="font-bold text-xl tracking-tight">My_Rotten_Tomatoes</span>
        </div>
        
      
        <nav className="flex-1 p-4 space-y-1.5">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'stats' ? 'bg-white/10 text-white shadow-inner' : 'text-red-200 hover:bg-white/5 hover:text-white'}`}
          >
            <span><BarChart3 /></span> <span>Statistiques & Notes</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('movies')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'movies' ? 'bg-white/10 text-white shadow-inner' : 'text-red-200 hover:bg-white/5 hover:text-white'}`}
          >
            <span></span> <Film /><span>Gestion des Films</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'users' ? 'bg-white/10 text-white shadow-inner' : 'text-red-200 hover:bg-white/5 hover:text-white'}`}
          >
            <span><FaPeopleArrows /></span> <span>Utilisateurs & Droits</span>
          </button>
        </nav>

        <div className="p-4 border-t border-red-850 bg-red-950/40 text-xs text-red-200 flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Admin</p>
            <p className="opacity-70">admin@tomates.com</p>
          </div>
          <span className="bg-green-500 w-2.5 h-2.5 rounded-full ring-4 ring-green-500/20"></span>
        </div>
      </aside>

       
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {activeTab === 'stats' && "Tableau de bord des statistiques"}
              {activeTab === 'movies' && "Catalogue & Ajout TMDB"}
              {activeTab === 'users' && "Modération des comptes"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Espace d'administration du site</p>
          </div>
          <button className="px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl hover:bg-slate-50 transition">
            Déconnexion
          </button>
        </header>

        
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">

          
          {activeTab === 'stats' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#00314F] p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-semibold text-white uppercase tracking-wider">Note Moyenne Générale</p>
                  <p className="text-3xl font-black text-white mt-2">7.8 <span className="text-sm font-normal text-slate-400">/10</span></p>
                  <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md"><BarChart3 /> Stable ce mois</span>
                </div>
                <div className="bg-[#00314F] p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-semibold text-white uppercase tracking-wider">Critiques Rédigées</p>

                  <p className="text-3xl font-black text-white mt-2">1 420</p>
                  <span className="inline-block mt-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">↑ +14% d'avis</span>
                </div>
                <div className="bg-[#00314F] p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-semibold text-white uppercase tracking-wider">Films Référencés</p>
                  <p className="text-3xl font-black text-white mt-2">348</p>
                  <span className="inline-block mt-2 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">Synchronisé avec TMDB</span>
                </div>
              </div>
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-[#660120] border-slate-100">
                  <h3 className="font-bold text-white">Dernières notes attribuées par le public</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-xs uppercase font-bold border-b border-slate-100">
                        <th className="px-6 py-4">Film</th>
                        <th className="px-6 py-4">Utilisateur</th>
                        <th className="px-6 py-4">Note</th>
                        <th className="px-6 py-4">Commentaire</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                      <tr>
                        <td className="px-6 py-4 font-semibold text-slate-900">Inception</td>
                        <td className="px-6 py-4">LucasM</td>
                        <td className="px-6 py-4"><span className="font-bold text-amber-500"><GoStarFill /> 9/10</span></td>
                        <td className="px-6 py-4 text-slate-400">"Un chef d'œuvre absolu, le scénario est parfait !"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

{/* On gere les fils à parttir de cette ligne*/}
          {activeTab === 'movies' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Importer un film via TMDB</h3>
                <p className="text-sm text-slate-400 mb-4">On entre l'ID ou le titre exact du film pour l'ajouter automatiquement à notre BDD.</p>
                <div className="flex gap-3 max-w-xl">
                  <input 
                    type="text" 
                    placeholder="Ex: tt1375666 ou Inception..." 
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm">
                    Rechercher & Importer
                  </button>
                </div>
              </div>
{/* CRUD pour les films. Mais Zoul a dit qu'il n' y a pas de CRUD en tant que tel. Donc on doit pouvoir supprimer uniquement*/}
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Films actuellement modifiables</h3>
                  <button className="text-sm font-semibold text-red-600 hover:underline">+ Ajouter manuellement</button>
                </div>
                <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-14 bg-slate-200 rounded-md"></div>
                    <div>
                      <p className="font-bold text-slate-900">Interstellar</p>
                      <p className="text-xs text-slate-400">Christopher Nolan (2014)</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-green-600 text-white font-medium 
                    rounded-lg text-xs hover:bg-lime-400 hover:text-black transition">Modifier
</button>

                    <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm">Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
          )}

 {/* Voici où on va gérer les utilisateurs*/}     
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Membres et Rôles</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">Alice Martin</p>
                    <p className="text-xs text-slate-400">Rôle actuel : <span className="font-semibold text-slate-600">Utilisateur</span></p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-50 text-blue-600 font-semibold rounded-lg text-xs hover:bg-blue-100 transition">
                      Passer Admin 
                    </button>
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 font-semibold rounded-lg text-xs hover:bg-red-100 transition">
                      Bannir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
