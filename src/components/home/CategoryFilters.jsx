import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Atom, BookText, MapPin } from 'lucide-react';
import api from '../../services/api';

function CategoryFilters() {
  
  const navigate = useNavigate();

  const [levels, setLevels] = useState([]);

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

  const handleCategoryClick = (levelSlug) => {
    // Navega para explorar passando o nivel como parâmetro de busca (query string)
    navigate(`/explorar?category=${levelSlug}`);
  };

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Explorar por Nível de Ensino
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Encontre recursos organizados por área de conhecimento
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <button
              key={level.idlevel}
              onClick={() => handleCategoryClick(level.slug)}
              className={`group p-8 rounded-3xl border-2 border-slate-100 bg-white transition-all duration-300 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-1 hover:border-orange-400`}
            >
              <div className={`w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <BookText className={`w-8 h-8 text-orange-500`} />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {level.name}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {level.description}
              </p>

            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoryFilters