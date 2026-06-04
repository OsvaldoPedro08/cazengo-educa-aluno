import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, School, Briefcase, FileText, 
  Save, LogOut, ChevronDown, Bell, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';
import { userAuthUser } from '../hooks/userAuth';
import api from '../services/api';

const NOTIFICATIONS_MOCK = [
  {
    id: 1,
    title: "Recurso Aprovado",
    message: "O seu manual de 'Matemática 4ª Classe' foi verificado e já está disponível para todos.",
    status: "approved",
    date: "Hoje, 10:30"
  },
  {
    id: 2,
    title: "Em Revisão",
    message: "O vídeo 'Cânticos Tradicionais de Cuanza Norte' está a ser analisado pela moderação.",
    status: "pending",
    date: "Ontem, 16:45"
  }
];

function Profile() {

  //lista de escolas
  const[schools, setSchools] = useState([]);

  useEffect(() => {
    const loadSchools = async () => {
      try {
            const response = await api.get('/Cazengo-Educa/api/escolas/ativas');

            setSchools(response.data);

      } catch (error) {
        showToast("Erro ao listar escolas!", "error");
      }
    }

    loadSchools();

  }, []);

  const { user } = userAuthUser();
  
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user.name,
    school_id : user.school_id
  });

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    
    setShowToast(true);
    
    setTimeout(() => setShowToast(false), 4000);
    
  };

  //terminar sessao
  const handleLogout = () => {

    //limpar os dados sensíveis do navegador
    localStorage.removeItem('@CazengoEduca:user');
    try {
          navigate('/login', { replace: true});
    } catch (error) {
      showToast("Erro ao terminar sessão!");
    }
  }

  const disabledStyle = "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-100";

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 relative overflow-x-hidden">

      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-black text-slate-900 mb-10 pl-2">O Meu Perfil</h1>

        {/* Header Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner shrink-0">
            <User className="text-green-300" size={56} strokeWidth={1.5} />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h2 className="text-2xl font-black text-slate-950">{formData.name}</h2>
            <p className="text-slate-500 font-medium mt-1 mb-4">{user.email}</p>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
              <User size={14} /> {user.type_user}
            </span>
          </div>
          <button onClick={handleLogout} className="shrink-0 flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors p-3 rounded-xl hover:bg-red-50">
             <LogOut size={20} /> Sair
          </button>
        </div>

        {/* --- ÁREA DE NOTIFICAÇÕES DE RECURSOS --- */}
        <div className="mb-10">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 pl-2">
            <Bell size={20} className="text-green-600" /> Notificações de Recursos
          </h3>
          <div className="grid gap-4">
            {NOTIFICATIONS_MOCK.map((notif) => (
              <div key={notif.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex gap-4 items-start">
                <div className={`p-3 rounded-2xl shrink-0 ${notif.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                  {notif.status === 'approved' ? <CheckCircle size={22} /> : <Clock size={22} />}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notif.date}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <FileText className="text-green-600" size={24} /> Dados do Utilizador
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 pl-1">Nome completo</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input name="nomeCompleto" type="text" value={formData.name} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all appearance-none pl-14"/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2 pl-1">E-mail</label>
                    <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input type="text" value={user.email} disabled className={`w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all appearance-none pl-14 ${disabledStyle}`} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2 pl-1">Perfil</label>
                    <div className="relative">
                        <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input type="text" value={user.type_user} disabled className={`w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all appearance-none pl-14 ${disabledStyle}`} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2 pl-1">Escola / Instituição</label>
                    <div className="relative">
                        <School className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <select value={formData.school_id} onChange={handleInputChange} className={`w-full px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-slate-800 focus:border-green-300 focus:ring-green-100 focus:ring-2 outline-none transition-all appearance-none pl-14 pr-12`}>
                            {schools.map(school => (
                                <option key={school.idschool} value={school.idschool}>{school.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                    </div>
                </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
            <button onClick={handleSaveChanges} className="flex items-center gap-2.5 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95">
              <Save size={20} /> Guardar Alterações
            </button>
          </div>
        </div>
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed top-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 z-[100] transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-slate-700">
          <div className="bg-green-500 p-2 rounded-full">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div>
            <p className="font-black text-sm">Perfil Atualizado!</p>
            <p className="text-slate-400 text-xs">As tuas alterações foram salvas com sucesso.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile