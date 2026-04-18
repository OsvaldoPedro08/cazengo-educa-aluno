import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Facebook, Cloud } from 'lucide-react';

function Login({ onLogin }) {
  
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSocialLogin = (provider) => {

    console.log(`Login com ${provider}`);
    
    // Simulação de login
    onLogin({
      name: "Osvaldo Pedro",
      email: email || "pedroosvaldo187@gmail.com",
      tipoUtilizador: "Professor(a)"
    });
    navigate('/');

  };

  const inputStyle = "w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all pl-14";

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Lado Esquerdo - Branding (Escondido no Mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-green-600/20 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-black text-white mb-6">Cazengo<span className="text-green-500 text-7xl">.</span>EDUCA</h1>
          <p className="text-slate-400 text-xl max-w-md mx-auto">
            A maior rede de partilha de recursos educativos de Cuanza Norte.
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Bem-vindo de volta!</h2>
            <p className="text-slate-500 font-medium text-sm">Insira os seus dados para aceder à plataforma.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input type="password" placeholder="Palavra-passe" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
            </div>
            <div className="flex justify-end">
              <button className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors">Esqueceu a senha?</button>
            </div>
          </div>

          <button onClick={() => handleSocialLogin('Email')} className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-green-700 transition-all mb-8 active:scale-95">
            Entrar na conta
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-4 bg-white text-slate-400 text-xs font-bold uppercase tracking-widest">Ou entrar com</span>
          </div>

          {/* Botões Sociais */}
          <div className="grid gap-4 mb-10">
            <button onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"><Chrome size={22} className="text-red-500" />Google</button>
            <button onClick={() => handleSocialLogin('Facebook')} className="flex items-center justify-center py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"><Facebook size={22} className="text-blue-600" />Facebook</button>
            <button onClick={() => handleSocialLogin('Apple')} className="flex items-center justify-center py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"><Cloud size={22} className="text-slate-900" />Apple</button>
          </div>

          <p className="text-center text-slate-500 text-sm font-medium">
            Ainda não tem conta? <button className="text-green-600 font-black hover:underline">Criar conta</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login