import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, ArrowRight, Calendar, User, Shield } from 'lucide-react';

function RecentResource() {
  const navigate = useNavigate();

  // MOCK DATA: Recursos (TODO: Estes dados virão do fetch para a tua API /api/resources)
  const resources = [
    {
      id: 1,
      title: "A Culpa é das Estrelas",
      description: "Um romance que disperta a literatura...",
      author: "Prof. Maria dos Santos",
      date: "12 Abr 2026",
      category: "Línguas e Literatura",
      license: "CC BY-SA",
      tipo: "pdf",
      url: "/tests/A_Culpa_E_Das_Estrelas.pdf",
      capa: "/tests/culpa_das_estrelas.jpeg",
    },
    {
    id: 2,
    title: "Fracção Mista",
    description: "Vídeo aula sobre fracção mista.",
    author: "Prof. Gizz",
    date: "10 Abr 2026",
    category: "Ciências Exatas",
    license: "CC0",
    type: "video",
    videoUrl: "/tests/fracao_mista.mp4",
  },
  {
    id: 3,
    title: "Material de Apoio para Ingressar à Universidade",
    description: "Um material de apoio com conteúdos sobre Biologia e Química para ingressar à universidade.",
    author: "Prof. Isabel António",
    date: "12 Abr 2026",
    category: "Ciências Sociais",
    license: "CC BY-SA",
    type: "pdf",
    url: "/tests/material_de_apoio.pdf",
    capa: "/tests/anatomia.jpg",
  },
  {
    id: 4,
    title: "Como Identificar os Tipos de Vozes",
    description: "Um vídeo explicando sobre como identifcar o tipo de voz.",
    author: "Prof. Joana Raimundo",
    date: "12 Abr 2026",
    category: "Ensino Primário",
    license: "CC0",
    type: "video",
    videoUrl: "/tests/tipo_de_voz.mp4",
  }
  ,
  {
    id: 5,
    title: "Análise de Sistemas",
    description: "Para quem está iniciando Análise de Sistemas, este conteúdo é essencial.",
    author: "Prof. Mário Pinto",
    date: "12 Abr 2026",
    category: "Ciências Sociais",
    license: "CC0",
    type: "pdf",
    url: "/tests/analise_sistemas.pdf",
    capa: "/tests/analise_sistema.jpeg"
  }
  
  ];

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
          {resources.map((res) => (
            <div 
              key={res.id}
              onClick={() => navigate(`/recurso/${res.id}`, {state: {resource : res} })} // TODO: Leva para ResourceViewer.jsx
              className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all cursor-pointer relative flex flex-col h-full"
            >
              {/* Badge da Licença (Canto Superior Direito) */}
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 uppercase">
                <Shield className="w-3 h-3" />
                {res.license} {/* Dinâmico do Banco de Dados */}
              </div>

              {/* Ícone e Título */}
              <div className="mb-4">
                <div className="bg-slate-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <FileText className="text-slate-600 group-hover:text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors line-clamp-2">
                  {res.title}
                </h3>
              </div>

              <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow">
                {res.description}
              </p>

              {/* Info de Rodapé do Card */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {res.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {res.date}
                    </div>
                  </div>

                  {/* Número de Downloads (Canto Inferior Direito) */}
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md font-medium text-slate-600">
                    <Download className="w-3 h-3" />
                    {res.downloads}
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