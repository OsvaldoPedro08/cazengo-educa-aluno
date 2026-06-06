import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, School, X, AlertCircle, CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react';
import api from '../services/api';

function Login() {
  
  //remove o usuario do localStorage
  //localStorage.removeItem('@CazengoEduca:user');
  //localStorage.removeItem("token");

  const navigate = useNavigate();
  
  // Lista as escolas para o select do cadastro
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    const loadSchools = async () => {
        try {
            const response = await api.get('/Cazengo-Educa/api/escolas/ativas');
            setSchools(response.data);
        } catch (error) {
            showToast("Erro ao listar as escolas!", "error");
        }
    };
    loadSchools();
  }, []);

  // States para Login
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // States do formulário para salvar no banco de dados (Cadastro)
  const [formData, setFormData] = useState({ 
      name: '', 
      email: '', 
      password: '', 
      type_user: '',
      status: '',
      school_id: '' 
    });

  // States para Modais
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  
  // States para Recuperação de Senha
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(240);

  // State para o Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Função para disparar o Toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // Timer para o código de recuperação
  useEffect(() => {
    
    let timer;
    
    if (showForgot && step === 2 && timeLeft > 0) {
    
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    
    } else if (timeLeft === 0) {
    
      showToast("Código expirado! Solicite um novo.", "error");
    
      setStep(1);
    
      setTimeLeft(240);
    
    }
    
    return () => clearInterval(timer);
  
  }, [showForgot, step, timeLeft]);

  // Fazer Login
  const handleLogin = async (e) => {
    
    e.preventDefault();
    
    try {
          const response = await api.post('/Cazengo-Educa/api/login', loginData);

          const { user, token } = response.data;

          //guarda os dados do usuario no armazenamento local do browser
          localStorage.setItem('@CazengoEduca:user', JSON.stringify(user));
          localStorage.setItem('token', token)

          //verifica se o usuario é admin! se for, nao permite logar
          if(user.type_user === 'Admin') {
            showToast("Erro de autenticação. Administradores não podem aceder a plataforma do aluno!", "error")
            return;
          }
          
          showToast("Bem-vindo(a) a plataforma Cazengo Educa!", "success");
          
          setTimeout(() => navigate('/'), 1000);
          
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao fazer login. Tente novamente!";
      showToast(errorMessage, "error");
    }
  };

  //criar conta nova
  const handleCreateAccountSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
          const newUser = {
            ...formData,
            status : 'Ativo',
            school_id : formData.school_id ? Number(formData.school_id) : null,
          }

          //salva na api
          await api.post('/Cazengo-Educa/api/usuarios/novo', newUser);

          setShowRegister(false);

          showToast("Conta criada com sucesso! Faça login.", "success");

    } catch (error) {
      
      const errorMessage = error.response?.data?.message || "Erro ao criar conta. Tente novamente!";

      showToast(errorMessage, "error");
    }
  };

  const handleRecoveryStep = () => {
    
    if (step === 1) {
    
      showToast("Código enviado para o seu email!", "success");
    
      setStep(2);
    
    } else if (step === 2) {
    
      showToast("Código validado com sucesso!", "success");
    
      setStep(3);
    
    } else {
    
      showToast("Senha atualizada com sucesso!", "success");
    
      setShowForgot(false);
    
      setStep(1);
    
      setTimeLeft(240);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
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

      {/* Lado Direito - Formulário de Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <div className='bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/20'>
              <GraduationCap className='text-white w-10 h-10' />
            </div>
            <h2 className="text-3xl text-center font-black text-slate-900 mb-2">Bem-vindo de volta!</h2>
            <p className="text-slate-500 text-center font-medium text-sm">Insira os seus dados para aceder à plataforma.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mb-8">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="email" 
                placeholder="E-mail" 
                onChange={e => setLoginData({...loginData, email: e.target.value})} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all pl-14"
                required
                autoComplete='username'
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="password" 
                placeholder="Palavra-passe" 
                onChange={e => setLoginData({...loginData, password: e.target.value})} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all pl-14"
                required
                autoComplete='current-password'
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-green-700 transition-all mb-8 active:scale-95 flex items-center justify-center gap-2">
              Entrar na conta <ArrowRight size={18} />
            </button>
          </form>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative px-4 bg-white text-slate-400 text-xs font-bold uppercase tracking-widest">Ou criar um perfil</span>
          </div>

          <p className="text-center text-slate-500 text-sm font-medium">
            Ainda não tem conta?{' '}
            <button type="button" onClick={() => setShowRegister(true)} className="text-green-600 font-black hover:underline">
              Criar conta
            </button>
          </p>
        </div>
      </div>

      {/* MODAL DE REGISTRO DO ALUNO */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl p-8 border border-slate-700 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="text-green-500 w-5 h-5" /> Criar Conta
              </h3>
              <button onClick={() => setShowRegister(false)} className="p-1 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateAccountSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="md:col-span-2">
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1 block">Nome Completo</label>
                <input 
                  required
                  type='text' 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-white focus:border-green-500 outline-none transition-colors"
                  placeholder="Nome Completo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1 block">Email</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-white focus:border-green-500 outline-none transition-colors" 
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1 block">Palavra-passe</label>
                <input 
                  required
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-white focus:border-green-500 outline-none transition-colors" 
                  placeholder="••••••••"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1 block">Perfil</label>
                <select 
                  required
                  value={formData.type_user}
                  onChange={e => setFormData({...formData, type_user: e.target.value})} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-white focus:border-green-500 outline-none transition-colors"
                >
                  <option value="">Selecionar...</option>
                  <option value="Aluno(a)">Aluno(a)</option>
                  <option value="Encarregado(a)">Encarregado(a)</option>
                  <option value="Professor(a)">Professor(a)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1 block">Minha Escola</label>
                <select 
                  value={formData.school_id}
                  onChange={e => setFormData({...formData, school_id: e.target.value})} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-2.5 text-white focus:border-green-500 outline-none transition-colors"
                >
                  <option value="">Selecionar escola...</option>
                  {schools.map(s => <option key={s.idschool} value={s.idschool}>{s.name}</option>)}
                </select>
              </div>

              <button type="submit" className="md:col-span-2 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-green-900/20 transition-all transform active:scale-[0.98]">
                Finalizar Cadastro
              </button>

            </form>
          </div>
        </div>
      )}

      {/* MODAL RECUPERAR SENHA */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] w-full max-w-md rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="text-green-500 w-5 h-5" /> Recuperar Acesso
              </h3>
              <button onClick={() => { setShowForgot(false); setStep(1); setTimeLeft(240); }} className="p-1 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {step === 1 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <p className="text-slate-400 text-sm leading-relaxed">Introduza o seu email cadastrado para receber o código de verificação seguro.</p>
                <input type="email" placeholder="seu-email@exemplo.com" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:border-green-500 outline-none transition-colors" />
                <button onClick={handleRecoveryStep} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-bold transition-all shadow-lg shadow-green-900/20">Enviar Código</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 text-center animate-in slide-in-from-right-4 duration-300">
                <p className="text-slate-400 text-sm italic">Enviamos um código de 6 dígitos para o seu email.</p>
                <div className="text-3xl font-mono font-bold tracking-widest text-green-400 bg-green-500/10 py-3 rounded-xl border border-green-500/20">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
                <div className="space-y-2">
                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Código de Verificação</label>
                    <input type="text" maxLength={6} placeholder="0 0 0 0 0 0" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-4 text-white text-center text-2xl font-bold tracking-[12px] focus:border-green-500 outline-none transition-colors" />
                </div>
                <button onClick={handleRecoveryStep} className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-bold transition-all shadow-lg shadow-green-900/20">Validar Código</button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                <p className="text-slate-400 text-sm">Validado! Escolha uma nova senha forte para a sua conta de aluno.</p>
                <div className="space-y-3">
                    <input type="password" placeholder="Nova Palavra-passe" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:border-green-500 outline-none" />
                    <input type="password" placeholder="Confirmar Nova Palavra-passe" className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:border-green-500 outline-none" />
                </div>
                <button onClick={handleRecoveryStep} className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg text-white font-bold transition-all shadow-lg shadow-emerald-900/20">Atualizar Senha</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPONENTE TOAST PERSONALIZADO */}
      {toast.show && (
        <div className={`fixed bottom-6 left-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border animate-in slide-in-from-left-10 duration-300 ${
          toast.type === 'success' 
          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
          : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium text-sm">{toast.message}</span>
          <button onClick={() => setToast({...toast, show: false})} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

export default Login;