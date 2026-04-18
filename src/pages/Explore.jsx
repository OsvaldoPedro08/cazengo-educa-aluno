import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Film, 
  FileText, User, Calendar, ChevronDown,
  LucideBookOpen
} from 'lucide-react';

// MOCK DATA: Categorias (Futuramente virão da API)
const MOCK_Categories = [
  {
    id: 1, 
    name: "Ensino Primário"
  },
  {
    id: 2, 
    name: "Ciências Exatas"
  },
  {
    id: 3, 
    name: "Línguas e Literatura"
  },
  {
    id: 4, 
    name: "Ciências Sociais"
  }
]

// MOCK DATA: Recursos (Futuramente virão da API)
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "A Culpa é das Estrelas",
    description: "Um romance que disperta a literatura...",
    author: "Prof. Maria dos Santos",
    date: "12 Abr 2026",
    category: "Línguas e Literatura",
    license: "CC BY-SA",
    type: "pdf",
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
  ,
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
    title: "Como Identificar os Tipos de Vozes",
    description: "Um vídeo explicando sobre como identifcar o tipo de voz.",
    author: "Prof. Joana Raimundo",
    date: "12 Abr 2026",
    category: "Ensino Primário",
    license: "CC0",
    type: "video",
    videoUrl: "/tests/tipo_de_voz.mp4",
  },
  {
    id: 10,
    title: "Como Identificar os Tipos de Vozes",
    description: "Um vídeo explicando sobre como identifcar o tipo de voz.",
    author: "Prof. Joana Raimundo",
    date: "12 Abr 2026",
    category: "Ensino Primário",
    license: "CC0",
    type: "video",
    videoUrl: "/tests/tipo_de_voz.mp4",
  }
];

function Explore() {
  const navigate = useNavigate();
  
  //controlo de paginas
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 7;

  //Pesquisa vindo do Hero Section
  const [searchParams] = useSearchParams(); //hook para recuperar o parâmetro na URL
  const searchFromUrl = searchParams.get('pesquisar') || ""; //captura o valor da URL

  //Pesquisa vindo da Category Filters
  const categoryFromUrl = searchParams.get('category') || "todas"; 

  // Estados para Filtros
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [activeType, setActiveType] = useState("todos");
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  //sincroniza caso a URL mude enquanto o usuario já está na página
  useEffect(() => {
    setSearchTerm(searchFromUrl);
    setActiveCategory(categoryFromUrl)
  }, [searchFromUrl, categoryFromUrl])

  // Lógica de Filtro (Memoizado para performance)
  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = activeType === "todos" || item.type === activeType;
      const matchesCategory = activeCategory === "todas" || item.category === activeCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, activeType, activeCategory]);

//=====================================================================
  //cálculo para paginação
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  //reseta para pagina 1 sempre que os filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeType, activeCategory]);

//=====================================================================

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Cabeçalho centralizado */}
        <div className="text-center mb-12">
            <div>
                <button className="mb-6 group relative flex items-center bg-[#1e2329] text-white pr-8 pl-14 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
                    {/* O Ícone Flutuante (O Segredo) */}
                    <div className="absolute -left-4 -top-2 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:rotate-12 transition-transform">
                    <LucideBookOpen className="text-[#0d1f17] w-6 h-6" strokeWidth={3} />
                    </div>

                    {/* O Texto */}
                    <span className="text-sm uppercase tracking-widest font-black">
                        Explorar Recursos
                    </span>
                </button>
            </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Explorar Todos Recursos</h1>
          <p className="text-slate-500 mt-2 font-medium">
            Pesquise e filtre os recursos educativos da comunidade.
          </p>
        </div>

        {/* Zona de Filtros e Busca Centralizada */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          
          {/* Botões de Tipo */}
          <div className="flex flex-wrap justify-center gap-3">
            {['todos', 'video', 'pdf', 'apresentacao'].map((type) => (
              <button 
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeType === type 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por tema, autor ou palavra-chave..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all text-lg shadow-sm"
            />
          </div>

          {/* Seletor de Categoria */}
          <div className="relative">
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm"
            >
              <option value="todas">Selecionar Categoria</option>
              {MOCK_Categories.map( (cat) => (
                  <option key={cat.id}>{cat.name}</option>
                ))
              }
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
          </div>
        </div>

        <div className="text-slate-600 pt-4 pl-4">
            <h4>Lista de Recursos</h4>
        </div>

        {/* Grid de Recursos atualizado automaticamente */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in shadow-md p-8">

            {currentResources.map((item) => (
              
              //Envia o conteudo do card para o ResourceViewer
              <div 
                key={item.id}
                onClick={() => navigate(`/recurso/${item.id}`, { state: { resource : item } })}
                className="group cursor-pointer flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {item.type === "video" ? (
                    <video 
                      src={item.videoUrl} 
                      className="w-full h-full object-cover"
                      muted
                      onMouseOver={e => e.target.play()}
                      onMouseOut={e => e.target.pause()}
                    />
                  ) : (
                    <img src={item.capa} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  )}

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">
                      {item.license}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-xl text-white">
                    {item.type === "video" ? <Film size={16} /> : <FileText size={16} />}
                  </div>
                </div>

                {/* Informações */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-50 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 italic">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <User size={14} className="text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-medium">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Paginação dos recursos */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16 pb-10">
                {Array.from({ length : totalPages }, (_, i) => i + 1).map((number) => (
                  <button key={number} onClick={() => {
                      setCurrentPage(number);

                      window.scrollTo({ top: 0, behavior: 'smooth'}); //sobe a pagina ao clicar
                    }}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      currentPage === number ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-110' : 'bg-white text-slate-400 border border-slate-200 hover:border-green-500 hover:text-green-500'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">Nenhum recurso encontrado com estes filtros.</p>
            <div className="flex items-center justify-center gap-1 mt-6">
                <Filter size={18} className="text-slate-400" />
                <button onClick={() => {setSearchTerm(""); setActiveType("todos"); setActiveCategory("todas"); navigate("/explorar");}} className="ml-2 text-green-600 font-bold underline">Limpar filtros</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore