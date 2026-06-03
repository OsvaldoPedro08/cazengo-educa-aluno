import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, ArrowRight, Calendar, User, Shield, GraduationCapIcon, Book, LucideAlignEndHorizontal, Film } from 'lucide-react';
import api from '../../services/api';

function RecentResource() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);

  useEffect(() => {
    const loadResources = async () => {
      try {
            const response = await api.get('/Cazengo-Educa/api/recursos/recentes');
            setResources(response.data);
      } catch (error) {
        
      }
    }

    loadResources();
  }, []);

  return (
    <section className="w-full bg-slate-50 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Recursos Recentes</h2>
            <p className="text-slate-500">Os últimos materiais partilhados pela comunidade de Cazengo.</p>
          </div>
          <button 
            onClick={() => navigate('/explorar')}
            className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
          >
            Ver todos os recursos <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grid de Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((item) => (
            <div 
              key={item.idresource}
              onClick={() => navigate(`/recurso/${item.idresource}`, { state: { resource: item } })}
              className="group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              {/* Media Container (Capa ou Vídeo) */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {item.type_resource === "Video" ? (
                  <video 
                    src={`${item.url_resource}`} 
                    className="w-full h-full object-cover"
                    muted
                    onMouseOver={e => e.target.play()}
                    onMouseOut={e => e.target.pause()}
                  />
                ) : (
                  <img 
                    src={item.cover_url ? (item.cover_url.startsWith('http') ? item.cover_url : `${item.cover_url}`) : ""} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                )}

                {/* Distintivo de Licença Aberta (REA) */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                    {item.license || "REA"}
                  </span>
                </div>

                {/* Ícone Indicador do Tipo de Ficheiro */}
                <div className="absolute bottom-4 left-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-xl text-white">
                  {item.type_resource === "Video" ? <Film size={16} /> : <FileText size={16} />}
                </div>
              </div>

              {/* Bloco de Conteúdo Textual */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-50 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                    {item.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 italic">
                  {item.description}
                </p>

                {/* Meta-dados Rodapé (Autor e Data) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                      <User size={14} className="text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 truncate">
                      {item.actor || "Desconhecido"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                    <Calendar size={12} />
                    <span className="text-[10px] font-medium">
                      {item.dtregister ? new Date(item.dtregister).toLocaleDateString('pt-PT') : 'Recente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Todos (Visível apenas em Mobile) */}
        <button 
          onClick={() => navigate('/explorar')}
          className="w-full mt-10 md:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 p-4 rounded-2xl font-bold"
        >
          Ver todos os recursos
        </button>

      </div>
    </section>
  );
}

export default RecentResource