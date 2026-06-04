import React, { useEffect, useState } from 'react';
import { 
  Download, ExternalLink, AlertCircle, MessageSquare, Send, User, Calendar, ArrowLeft,
  SendIcon,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../../services/api';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { userAuthUser } from '../../hooks/userAuth';

const API_BASE_URL = "http://localhost:8080";

function ResourceViewer() {

  const { user } = userAuthUser(); //usuario vindo do localStorage

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //se o usuario estiver logado, os botoes de download e abrir em nova aba ficam habilitados
  useEffect(() => {
    const loadLoggin = () => {

      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    loadLoggin();
  })

  const [toast, setToast] = useState({ show: false, message: "" });

  const location = useLocation();
  const navigate = useNavigate();

  const { resource } = location.state || {}; //trás o recurso da URL

  const [comments, setComments] = useState([]);
  const [resources, setResources] = useState([]);

  // Sistema de Notificação (Toast)
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  //lista todos os comentarios do recurso
  useEffect(() => {
    const loadComments = async () => {

      try {
            //busca os comentarios do recurso
            const response = await api.get(`/Cazengo-Educa/api/comentarios/recurso/${resource.idresource}`);

            setComments(response.data);

      } catch (error) {
        showToast("Erro ao comunicar-se com o servidor!")
      }
    }

    loadComments();

  }, []);

  //lista o recurso com a id do parametro
  useEffect(() => {
    const loadResources = async () => {
      try {
            const response = await api.get(`/Cazengo-Educa/api/recursos/${resource.idresource}`);

            setResources(response.data);

      } catch (error) {
        showToast("Erro ao Buscar Recurso!")
      }
    }

    loadResources();
  }, []);

    //data para os dados do comentário
  const [formData, setFormData] = useState({
      user_id: '',
      comment: '',
      resource_id: ''
  });  

  if (!resource) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-500 mb-4 font-medium">Nenhum recurso selecionado ou disponível.</p>
        <button onClick={() => navigate('/explorar')} className="bg-green-600 text-white px-6 py-2.5 rounded-full font-bold">
          Voltar para Explorar Recursos
        </button>
      </div>
    );
  }

  //Garante que IDs numéricos locais não quebrem o método .startsWith
  const safeIdResource = String(resource.idresource || '');

  const isYouTube = resource.url_resource?.includes("youtube.com") || resource.url_resource?.includes("youtu.be");
  const isGoogleBooks = safeIdResource.startsWith('gb_');

  const finalResourceUrl = isYouTube 
    ? resource.url_resource 
    : `${resource.url_resource}`;

  const handleOpenNewTab = () => {
    
    if(!isLoggedIn) {
      showToast("Inicia sessão para abrir o recurso em nova aba!");
      return;
    }
    window.open(
      `https://docs.google.com/viewer?url=${encodeURIComponent(finalResourceUrl)}&embedded=true`, 
      '_blank', 'noopener,noreferrer'
    );
  };

  const handleDownload = () => {
    
    if (!isLoggedIn) {
      showToast("Inicia sessão para fazer download do recurso!");
      return;
    }

    const link = document.createElement('a');
    link.href = finalResourceUrl;
    link.setAttribute('download', resource.title || 'recurso-cazengo');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddComment = async (e) => {
    
    e.preventDefault();
    
    try {
          if(!formData.comment.trim()) { //nao envia comentario vazio
            return;
          }

          const newComment = {
            ...formData,
            user_id: user.id,
            resource_id: resource.idresource
          };

          //logica para salvar na api
          await api.post('/Cazengo-Educa/api/comentarios/novo', newComment);

          setFormData('');

          showToast("Comentário adicionado com sucesso!");

          //atualiza a lista de comentários
          const response = await api.get(`/Cazengo-Educa/api/comentarios/recurso/${resource.idresource}`);
          setComments(response.data);

        } catch (error) {
          showToast("Erro ao enviar comentário!")
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-5xl">
        
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold text-sm">
          <ArrowLeft size={16} /> Voltar ao Explorar Recursos
        </button>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 leading-tight">{resource.title}</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-500 text-xs sm:text-sm">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center border">
              <User size={12} className="text-green-600" />
            </div>
            <span className="font-bold text-slate-700">{resource.actor || "Professor"}</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Calendar size={14} className="ml-1 sm:ml-0" />
            <span>{resource.dtregister ? new Date(resource.dtregister).toLocaleDateString('pt-PT') : 'Recente'}</span>
            <p className="text-xs md:text-sm text-slate-600 break-words leading-normal text-justify line-clamp-5">
              {resource.description}
            </p>
          </div>
        </div>

        {/* Player / Content Box */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border mb-8">
          <div className="aspect-video bg-slate-100 relative group">
            {resource.type_resource === "Video" ? (
              isYouTube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${safeIdResource.replace('yt_', '')}`}
                  title={resource.title}
                  className="w-full h-full bg-black border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video 
                  src={finalResourceUrl} 
                  controls 
                  className="w-full h-full bg-black"
                  poster={resource.cover_url ? `${resource.cover_url}` : undefined}
                />
              )
            ) : (
              <img 
                src={resource.cover_url?.startsWith('http') ? resource.cover_url : `${resource.cover_url}`} 
                alt="Capa do Recurso" 
                className="w-full h-full object-cover" 
              />
            )}
          </div>

          {/* Barra de Ações (Otimizada para Telemóveis) */}
          <div className="p-4 sm:p-6 bg-white border-t">
            <div className="flex flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 w-full">
              
              <button 
                onClick={handleOpenNewTab}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 bg-green-600 text-white px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm hover:bg-green-700 transition-all shadow-md
                  ${isLoggedIn ? 'bg-[#1e2329] border-[#1e2329] text-white hover:bg-black' : 'bg-[#1e2329] border-slate-200 text-slate-400 hover:bg-black' }`}
              >
                <ExternalLink size={13} /> 
                <span className="truncate">
                  {/* Texto adaptado para o Google Books */}
                  {isGoogleBooks ? "Ler Livro Digital" : "Abrir em nova aba"}
                </span>
              </button>
              
              <button 
                onClick={handleDownload}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all border-2 ${
                  isLoggedIn ? 'bg-[#1e2329] border-[#1e2329] text-white hover:bg-black' : 'bg-[#1e2329] border-slate-200 text-slate-400'
                }`}
              >
                <Download size={13} /> <span className="truncate">Descarregar</span>
              </button>

            </div>
          </div>
        </div>

        {/* Card Informativo de Licença */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-5 sm:p-6 rounded-r-2xl mb-12 flex gap-3">
          <AlertCircle className="text-orange-500 shrink-0" size={20} />
          <div>
            <h4 className="text-orange-900 font-black mb-1 uppercase text-[10px] tracking-widest">
              {isGoogleBooks ? "Biblioteca Digital Aberta" : "Aviso de Licença REA"}
            </h4>
            <p className="text-orange-800 text-xs sm:text-sm leading-relaxed">
              {isGoogleBooks ? (
                <span>
                  Este livro ou manual didático é disponibilizado através da infraestrutura pública do <strong>Google Books</strong>. O acesso e a visualização cumprem os regulamentos de distribuição educacional aberta em português.
                </span>
              ) : (
                <span>
                  Este recurso está sob a licença <span className="font-black underline">{resource.license || "REA"}</span>.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Secção de Comentários */}
          {resources && (
            <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border">

              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Comentários ({comments.length})</h3>
              </div>

              {/* se estiver logado, aparece o comentatio */}
              {isLoggedIn && (
                <form onSubmit={handleAddComment} className="mb-10 relative">
                  <textarea 
                    value={formData.comment}
                    onChange={ e => setFormData({...formData, comment: e.target.value})}
                    placeholder="Partilhe a sua opinião..."
                    className="w-full bg-slate-50 border rounded-2xl p-4 pr-16 outline-none h-28 resize-none text-sm text-slate-700"
                  />
                  <button type="submit" className="absolute right-3 bottom-3 p-3 bg-green-600 text-white rounded-xl">
                    <SendIcon />
                  </button>
                </form>
              )}

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.idcoment} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-bold text-sm text-slate-400">
                      {comment.username.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 text-xs">{comment.username} - {comment.type_user}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{comment.createdAt ? formatTimeAgo(comment.createdAt) : 'Recente'}</span>
                      </div>
                      <p className="text-slate-600 text-xs bg-slate-50/50 p-4 rounded-2xl border">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

      </div>

      {/* TOAST NOTIFICAÇÃO */}
      {toast.show && (
        <div className="fixed bottom-8 left-8 bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-left-10 duration-300 z-[200]">
          <CheckCircle2 className="text-green-400" size={20} />
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

    </div>
  );
}

export default ResourceViewer;