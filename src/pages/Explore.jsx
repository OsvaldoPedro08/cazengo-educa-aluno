import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, Film, 
  FileText, User, Calendar, ChevronDown,
  LucideBookOpen
} from 'lucide-react';

import api from '../services/api'; 

function Explore() {
  
  const navigate = useNavigate();

  // Controlo de páginas para a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 7;

  // Parâmetros de pesquisa recuperados da URL do browser
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('pesquisar') || "";
  const categoryFromUrl = searchParams.get('category') || "todas"; 

  // Estados dos Filtros na barra de pesquisa
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  
  // Evita chamadas excessivas ao servidor
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);
  
  const [activeType, setActiveType] = useState("todos");
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  //estado do nivel
  const [levels, setLevels] = useState([]);

  // Estados dos recursos
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //estados da classe e disciplina
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

   //armazena os primeiros dados carregado no select da disciplina
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // Sincroniza os inputs caso o utilizador venha de outra página com filtros na URL
  useEffect(() => {
    setSearchTerm(searchFromUrl);
    setDebouncedSearch(searchFromUrl);
    setActiveCategory(categoryFromUrl);
  }, [searchFromUrl, categoryFromUrl]);

  // Lógica de Debounce: Aguarda 500ms de pausa na digitação para atualizar o estado real de busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // effect Principal: Dispara o pedido Axios sempre que se muda de nível ou o 
  // termo validado muda
  useEffect(() => {
    
    const fetchRealResources = async () => {
    
      if(levels.length === 0) {
        return;
      }

      setIsLoading(true);
    
      try {

          //procura o nome do nivel baseado no slug
          const findLevel = levels.find(level => level.slug === activeCategory);

          //se encontrou, usar o .name (ex: Ensino Superior)
          const levelParamForBackend = findLevel ? findLevel.name : "todas";

          const response = await api.get('/Cazengo-Educa/api/recursos/publicos', {
            params: {
              level: levelParamForBackend, //envia o nome associado ao slug
              search: debouncedSearch,
              grade: grade,
              subject: subject
            }
        });

        // Armazena a resposta unificada (Dados do Banco Local + OpenAlex se for Ensino 
        // Superior + YoutubeVideo se for ensino medio ou secundario)
        setResources(response.data || []);
      
      } catch (error) {
      
        console.error("Erro ao carregar dados da cazengo-educa-api:", error);
      
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealResources();
  }, [debouncedSearch, activeCategory, levels, grade, subject]);

//lista os niveis de ensino
    useEffect(() => {
      const fetchLevels = async () => {
        try {
              const response = await api.get('/Cazengo-Educa/api/nivel_ensino/ativo');
  
              setLevels(response.data);
  
        } catch (error) {
          showToast("Erro ao conectar com o servidor!")
        }
      };
  
      fetchLevels();
  
    }, []);

  //atualiza o select da disciplina com um array estatico
  useEffect(() => {
    //se a classe for "todas", pegar todas as disciplinas do resources atual
    if(grade === "todas" || grade === "") {
      const allSubjects = resources.map(r => r.subject).filter(Boolean);
      const uniqueSubjects = [...new Set(allSubjects)];

      setAvailableSubjects(uniqueSubjects);

    } else {
      //se escolheu uma classe especifica, filtra-se o resources atual antes da API mudar
      const subjectsOfGrade = resources
      .filter(r => r.grade === grade)
      .map(r => r.subject)
      .filter(Boolean);

      const uniqueSubjects = [...new Set(subjectsOfGrade)];

      setAvailableSubjects(uniqueSubjects);
    }
  }, [grade]); //monitora a mudança de classes

  // Filtro Local em memória: Atua apenas sobre o Tipo do Recurso (Vídeo, Livros, Planos de aula
  // leis, normativos e circulares)
  const filteredResources = useMemo(() => {
    return resources.filter(item => {
      if (activeType === "todos") return true;
      return item.type_document === activeType;
    });
  }, [resources, activeType]);

  // Cálculos matemáticos da paginação
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  // Retorna para a página 1 quando qualquer filtro for alterado
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeType, activeCategory]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <button className="mb-6 group relative flex items-center bg-[#1e2329] text-white pr-8 pl-14 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
              <div className="absolute -left-4 -top-2 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:rotate-12 transition-transform">
                <LucideBookOpen className="text-[#0d1f17] w-6 h-6" strokeWidth={3} />
              </div>
              <span className="text-sm uppercase tracking-widest font-black">Explorar Recursos</span>
            </button>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Explorar Todos Recursos</h1>
          <p className="text-slate-500 mt-2 font-medium">Pesquise e filtre os recursos educativos da comunidade.</p>
        </div>

        {/* Filtros */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          
          {/* Botao Filtro por Tipo de Ficheiro */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setActiveType("todos");
                setActiveCategory("todas");
              }}
              className='px-6 py-2 rounded-full text-sm font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Todos
            </button>
            <button
              onClick={() => {
                setActiveType("LIVRO");
              }}
              className='px-6 py-2 rounded-full text-sm font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Livros
            </button>
            <button
              onClick={() => {
                setActiveType("VIDEO");
              }}
              className='px-6 py-2 rounded-full text-sm font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Vídeos
            </button>
            <button
              onClick={() => {
                setActiveType("PLANO_AULA");
                setActiveCategory("todas");
              }}
              className='px-6 py-2 rounded-full text-sm font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Planos de Aula
            </button>
            <button
              onClick={() => {
                setActiveType("LEI_NORMATIVO");
                setActiveCategory("todas");
              }}
              className='px-6 py-2 rounded-full text-sm font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Leis, Normativos e Circulares
            </button>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por tema, autor ou palavras-chave..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all text-lg shadow-sm"
            />
          </div>

          {/* Seletor do Nível de Ensino */}
          {activeType !== "LEI_NORMATIVO" && activeType !== "PLANO_AULA" && (
            <div className="relative">
            <label className='text-md font-medium text-slate-500'>Filtrar por Níveis de Ensino</label>
            <select 
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setGrade("todas");
                setSubject("todas");
              }}
              className="mt-2 w-full appearance-none bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm"
            >
              <option value="todas">Todos os Níveis</option>
              {levels.map((level) => (
                <option key={level.idlevel} value={level.slug}>{level.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
          </div>
          )}

          {/* Seletor da classe */}
          {activeType !== "LEI_NORMATIVO" && activeType !== "PLANO_AULA" &&
          activeCategory !== "todas" && activeCategory !== '' && (
            <div className="relative">
              <label className='text-md font-medium text-slate-500'>Filtrar por Classe</label>
              <select 
                value={grade}
                onChange={(e) => {
                  setGrade(e.target.value);
                  setSubject("todas")
                }}
                className="mt-2 w-full appearance-none bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm"
              >
  
                <option value="todas">Todas as Classes</option>
                {resources
                  .filter(r => {
                    //se o nivel for "todas" nao filtra por nivel e mostra todas as categorias
                    if(activeCategory === "todas" || activeCategory === "") return true;

                    const foundLevel = levels.find(level => level.slug === activeCategory);
                    return r.level === foundLevel?.name;
                  })
                  .map(r => r.grade)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((grade, index) => (
                    <option key={index} value={grade}>{grade}</option>
                  ))
                }
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
            </div>
          )}

          {/* Seletor da disciplina */}
          {activeType !== "LEI_NORMATIVO" && activeType !== "PLANO_AULA" && 
          activeCategory !== "todas" && activeCategory !== '' && grade !== 'todas' && grade !== ''
          && (
            <div className="relative">
              <label className='text-md font-medium text-slate-500'>Filtrar por Disciplina</label>
              <select 
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                className="mt-2 w-full appearance-none bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-10 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer shadow-sm"
              >
                <option value="todas">Todas as Disciplinas</option>
                {/** busca os dados da array estatica */}
                {availableSubjects.map((sub, index) => (
                  <option key={index} value={sub}>{sub}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
            </div>
          )}

          <div className="flex items-center justify-center gap-1 mt-6">
              <Filter size={18} className="text-slate-400" />
              <button 
                onClick={() => {
                  setSearchTerm(""); 
                  setActiveType("todos"); 
                  setActiveCategory("todas"); 
                  navigate("/explorar");
                }} 
                className="ml-2 text-green-600 font-bold underline"
              >
                Limpar filtros e reiniciar
              </button>
            </div>
          
        </div>

        {/* Lista de recursos */}
        <div className="text-slate-600 pt-4 pl-4 mb-4">
          <h4 className="font-bold flex items-center gap-2">
            Lista de Recursos Disponíveis 
            {isLoading && <span className="text-sm text-green-500 font-medium animate-pulse">(A atualizar conteúdos...)</span>}
          </h4>
        </div>

        {/* Grid de Recursos */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">

            {currentResources.map((item) => (
              <div 
                key={item.idresource}
                onClick={() => navigate(`/recurso/${item.idresource}`, { state: { resource: item } })}
                className="group flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Media Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {item.type_resource === "Video" && !item.url_resource.includes("youtube.com") ? (
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
        ) : (
          /* Estado Vazio (Nenhum Resultado Encontrado) */
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">Nenhum recurso educativo encontrado para este nível ou termo.</p>
          </div>
        )}

        {/* Componente Visual de Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 pb-10">
            {Array.from({ length : totalPages }, (_, i) => i + 1).map((number) => (
              <button 
                key={number} 
                onClick={() => {
                  setCurrentPage(number);
                  window.scrollTo({ top: 0, behavior: 'smooth'});
                }}
                className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                  currentPage === number 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-110' 
                  : 'bg-white text-slate-400 border border-slate-200 hover:border-green-500 hover:text-green-500'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore;