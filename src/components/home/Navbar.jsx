import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenText, Menu, X, UserCircle, Search, Share2, Info, KeyRound, LogOut, LogIn } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // --- MOCK DATA (Para ligar à API depois) ---
  const user = {
    isLoggedIn: true, // TODO: Mudar para false para testar o botão "Entrar"
    name: "Osvaldo Pedro"
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-[#0d1f17] shadow-md border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-5 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-green-950 p-2 rounded-xl border border-green-800">
              <BookOpenText className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-white text-xl font-bold">Cazengo <span className="text-white/50 font-medium">EDUCA</span></span>
          </Link>

          {/* Links Desktop - Apenas Aluno/Professor */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/" className={`px-4 py-2 rounded-xl transition-all ${isActive('/') ? 'text-green-400 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              Início
            </Link>
            <Link to="/explorar" className={`px-4 py-2 rounded-xl transition-all ${isActive('/explorar') ? 'text-green-400 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              Explorar
            </Link>
            <Link to="/partilhar-recurso" className={`px-4 py-2 rounded-xl transition-all ${isActive('/partilhar-recurso') ? 'text-green-400 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              Partilhar (REA)
            </Link>
            <Link to="/licencas" className={`px-4 py-2 rounded-xl transition-all ${isActive('/licencas') ? 'text-green-400 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              Licenças
            </Link>
            <Link to="/sobre" className={`px-4 py-2 rounded-xl transition-all ${isActive('/sobre') ? 'text-green-400 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              Sobre Cazengo
            </Link>
          </div>

          {/* Autenticação */}
          <div className="hidden lg:flex items-center gap-4">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/perfil" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                  <UserCircle className="w-6 h-6 text-green-500" />
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                <button className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
                <LogIn className="w-5 h-5" /> Entrar
              </Link>
            )}
          </div>

          {/* Hamburger Mobile */}
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-white p-2 bg-white/5 rounded-xl">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* --- MENU MOBILE (Offcanvas) --- */}
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-all duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      
      <div className={`fixed top-0 right-0 h-full w-72 bg-[#0d1f17] z-[70] p-6 transform transition-all duration-300 ease-in-out lg:hidden border-l border-white/5 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <span className="text-white/40 font-bold uppercase text-xs tracking-widest">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-white/60 p-2 hover:bg-white/5 rounded-lg transition-colors"><X /></button>
        </div>

        <div className="flex flex-col gap-1">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-3 transition-all ${isActive('/') ? 'bg-green-600/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`}><BookOpenText className="w-5 h-5"/> Início</Link>
          <Link to="/explorar" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-3 transition-all ${isActive('/explorar') ? 'bg-green-600/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`}><Search className="w-5 h-5"/> Explorar</Link>
          <Link to="/partilhar-recurso" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-3 transition-all ${isActive('/partilhar-recurso') ? 'bg-green-600/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`}><Share2 className="w-5 h-5"/> Partilhar (REA)</Link>
          <Link to="/licencas" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-3 transition-all ${isActive('/licencas') ? 'bg-green-600/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`}><KeyRound className="w-5 h-5"/> Licenças</Link>
          <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-3 transition-all ${isActive('/sobre') ? 'bg-green-600/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`}><Info className="w-5 h-5"/> Sobre Cazengo</Link>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            {user.isLoggedIn ? (
              <div className="space-y-2">
                <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="text-white p-4 bg-white/5 rounded-xl flex items-center gap-3 w-full"><UserCircle className="w-5 h-5 text-green-500"/> Meu Perfil</Link>
                <button className="w-full text-red-400 p-4 flex items-center gap-3 hover:bg-red-400/5 rounded-xl transition-all"><LogOut className="w-5 h-5"/> Sair</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-green-600 text-white text-center p-4 rounded-xl font-bold flex items-center justify-center gap-2 w-full"><LogIn className="w-5 h-5"/> Entrar</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}