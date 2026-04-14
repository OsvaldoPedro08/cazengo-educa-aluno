import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Search, UploadCloud, GraduationCap } from 'lucide-react';

function HeroSection() {
  const navigate = useNavigate();

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Capturar o valor do input e passar via query string
    navigate('/explorar'); 
  };

  return (
    <section className="relative bg-[#0d1f17] py-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />

      <div className="relative container mx-auto max-w-4xl text-center">
        
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
          <Book className="w-4 h-4 text-green-400" />
          <span className="text-white/80 text-sm font-medium">Plataforma de Recursos Educativos Abertos</span>
        </div>

        {/* Título Principal */}
        <h1 className="md:text-6xl font-bold text-white mb-6 leading-tight">
          Conectando Professores, Alunos, Encarregados e <br />
          <span className="text-green-400 px-4">Partilhando Conhecimento</span>
           em Cazengo
        </h1>

        {/* Subtítulo */}
        <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Aceda a milhares de recursos educativos gratuitos e abertos criados pela nossa comunidade acadêmica.
        </p>

        {/* Barra de Pesquisa */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 mb-10 max-w-3xl mx-auto">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search className="text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Pesquisar: Matemática 8ª classe..." 
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/30"
            />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-400 text-[#0d1f17] font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-green-500/20">
            Pesquisar
          </button>
        </form>

        {/* Botões de Ação Inferiores */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/explorar')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 px-8 py-4 rounded-2xl font-bold transition-all"
          >
            <GraduationCap className="w-5 h-5" />
            Começar a Explorar
          </button>

          <button 
            onClick={() => navigate('/partilhar-recurso')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all"
          >
            <UploadCloud className="w-5 h-5 text-white/60" />
            Publicar meu Recurso
          </button>
        </div>

      </div>
    </section>
  );
}

export default HeroSection