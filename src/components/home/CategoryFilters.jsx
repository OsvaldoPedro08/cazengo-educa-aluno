import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Atom, BookText, MapPin } from 'lucide-react';

function CategoryFilters() {
  const navigate = useNavigate();

  // MOCK DATA: Categorias (Futuramente virão da API)
  const categories = [
    { 
      id: 1, 
      name: "Ensino Primário", 
      description: "1ª à 6ª classe", 
      icon: Pencil, 
      color: "hover:border-orange-400", 
      iconBg: "bg-orange-50", 
      iconColor: "text-orange-500",
      slug: "ensino_primario" 
    },
    { 
      id: 2, 
      name: "Ciências Exatas", 
      description: "Matemática, Física, Química, etc", 
      icon: Atom, 
      color: "hover:border-blue-400", 
      iconBg: "bg-blue-50", 
      iconColor: "text-blue-500",
      slug: "ciencias_exatas"
    },
    { 
      id: 3, 
      name: "Línguas e Literatura", 
      description: "Português, Inglês, Kimbundu, etc", 
      icon: BookText, 
      color: "hover:border-green-400", 
      iconBg: "bg-green-50", 
      iconColor: "text-green-500",
      slug: "linguas"
    },
    { 
      id: 4, 
      name: "Ciências Sociais", 
      description: "História, Geografia, Sociologia, etc", 
      icon: MapPin, 
      color: "hover:border-red-400", 
      iconBg: "bg-red-50", 
      iconColor: "text-red-500",
      slug: "ciencias_sociais"
    }
  ];

  const handleCategoryClick = (categorySlug) => {
    // Navega para explorar passando a categoria como parâmetro de busca (query string)
    navigate(`/explorar?categoria=${categorySlug}`);
  };

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Explorar por Disciplina
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Encontre recursos organizados por área de conhecimento
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`group p-8 rounded-3xl border-2 border-slate-100 bg-white transition-all duration-300 text-center flex flex-col items-center hover:shadow-xl hover:-translate-y-1 ${cat.color}`}
            >
              {/* Ícone com fundo colorido suave */}
              <div className={`w-16 h-16 ${cat.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <cat.icon className={`w-8 h-8 ${cat.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {cat.name}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {cat.description}
              </p>

              {/* TODO: Futuramente mostrar aqui o total de recursos da API: "124 recursos" */}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoryFilters