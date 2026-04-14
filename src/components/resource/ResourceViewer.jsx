import React, { useState } from 'react';
import { 
  Download, ExternalLink, AlertCircle, MessageSquare, 
  Send, User, Calendar, X, CheckCircle, 
  ArrowLeft
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ResourceViewer() {
  const [isLoggedIn] = useState(true); // Simulação: mude para true para permitir download
  const [showToast, setShowToast] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Mateus Pedro", text: "Excelente material! Ajudou-me muito na revisão de álgebra.", date: "Há 2 horas" }
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  //captura o recurso vindo do explore
  const { resource } = location.state || {};

  //se o utilizador tentar aceder ao link direto sem clicar num card
  if(!resource) {
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <p className="text-slate-500 mb-4">
                Nenhum recurso selecionado.
            </p>
            <button onClick={() => navigate('/explorar')} className="bg-green-600 text-white px-6 py-2 rounded-full">
                Voltar em Explorar Recursos
            </button>
        </div>
    );
  }

  const link = document.createElement('a');
  link.href = resource.url || resource.videoUrl;

  const handleDownload = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }
    window.location.href = resource.url || resource.videoUrl;
    link.download = resource.titulo;
    link.click();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj = { id: Date.now(), user: "Você (Osvaldo)", text: newComment, date: "Agora mesmo" };
    setComments([commentObj, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        
        {/*Botao de voltar em explore */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold transition-colors">
            <ArrowLeft size={18} />
            Voltar ao Explorar Recursos
        </button>

        {/* Título e Autor */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">{resource.titulo}</h1>
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
              <User size={14} className="text-green-600" />
            </div>
            <span className="font-bold text-sm">{resource.autor}</span>
            <span className="text-slate-300">|</span>
            <Calendar size={14} />
            <span className="text-xs">Publicado em Abril de 2026</span>
          </div>
        </div>

        {/* Visualizador Principal */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 mb-8">
          <div className="aspect-video bg-slate-100 relative group">
            {resource.tipo === "video" ? (
              <video 
                src={resource.videoUrl} 
                controls 
                className="w-full h-full bg-black"
                poster={resource.capa}
              />
            ) : (
              <img 
                src={resource.capa} 
                alt="Capa do Recurso" 
                className="w-full h-full object-cover" 
              />
            )}
          </div>

          {/* Barra de Ações */}
          <div className="p-6 flex flex-wrap items-center justify-between gap-4 bg-white border-t border-slate-50">
            <div className="flex gap-3">
              <button 
                onClick={() => window.open(resource.tipo === "video" ? resource.videoUrl : resource.url, "_blank", "noopener, noreferrer")}
                className="flex items-center gap-2 bg-[#1e2329] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-black/10"
              >
                <ExternalLink size={18} /> Abrir em nova aba
              </button>
              
              <button 
                onClick={handleDownload}
                className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all border-2 ${
                  isLoggedIn 
                  ? 'bg-green-600 border-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200' 
                  : 'bg-white border-slate-200 text-slate-400 cursor-pointer hover:border-red-200 hover:text-red-400'
                }`}
              >
                <Download size={18} /> Descarregar
              </button>
            </div>
          </div>
        </div>

        {/* Alerta de Licença (Laranja) */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-[2rem] mb-12 flex gap-4">
          <AlertCircle className="text-orange-500 shrink-0" size={24} />
          <div>
            <h4 className="text-orange-900 font-bold mb-1 uppercase text-xs tracking-widest">Aviso de Licença REA</h4>
            <p className="text-orange-800 text-sm leading-relaxed">
              Este recurso está sob a licença <span className="font-black underline">{resource.licenca}</span>. 
              Pode utilizar e adaptar, desde que cite o autor original sob os termos da licença Creative Commons.
            </p>
            <p>
                <Link to="https://creativecommons.org/licenses/" className="text-orange-800 text-sm leading-relaxed underline">
                    Saber mais
                </Link>
            </p>
          </div>
        </div>

        {/* Secção de Comentários */}
        <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-50 rounded-lg">
              <MessageSquare className="text-green-600" size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Comentários ({comments.length})</h3>
          </div>

          <form onSubmit={handleAddComment} className="mb-10 relative">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partilhe a sua opinião sobre este material..."
              className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6 pr-20 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none h-28 resize-none transition-all text-slate-700"
            />
            <button 
              type="submit"
              className="absolute right-4 bottom-4 p-3.5 bg-green-600 text-white rounded-2xl hover:bg-green-700 shadow-xl shadow-green-200 transition-all active:scale-90"
            >
              <Send size={20} />
            </button>
          </form>

          <div className="space-y-8">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-5 animate-fade-in-up">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-400 font-bold">
                    {comment.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800 text-sm">{comment.user}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{comment.date}</span>
                    </div>
                    <p className="text-slate-600 text-[14px] leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-sm italic">Ainda não há comentários neste recurso.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Toast de Login (Canto Inferior Esquerdo) */}
      {showToast && (
        <div className="fixed bottom-10 left-10 z-[100] flex items-center gap-4 bg-slate-900 text-white p-5 rounded-[1.5rem] shadow-2xl border border-white/10 animate-fade-in-left">
          <div className="bg-red-500 p-2 rounded-xl">
            <AlertCircle size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black">Acesso Negado</p>
            <p className="text-[11px] opacity-70">Faça login para descarregar recursos.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-4 opacity-30 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ResourceViewer