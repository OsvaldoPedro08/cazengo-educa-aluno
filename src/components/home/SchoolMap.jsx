import React from 'react';
import { School, MapPin, GraduationCap, Users } from 'lucide-react';

function SchoolMap() {
  
  // MOCK DATA: Escolas Ativas (TODO: Virá da API filtrando escolas com recursos publicados)
  const activeSchools = [
    {
      id: 1,
      name: "Escola Missionária nº 9 Santa Maria Goretti",
      location: "Rua da Misão",
      resourcesCount: 124,
      teachersCount: 12
    },
    {
      id: 2,
      name: "Instituo Técnico de Saúde",
      location: "Largo das Escolas",
      resourcesCount: 89,
      teachersCount: 8
    },
    {
      id: 3,
      name: "Instituo Superior Politécnico de Ndalatando",
      location: "Catome de Baixo",
      resourcesCount: 56,
      teachersCount: 5
    }
  ];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabeçalho */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Escolas na Comunidade</h2>
          </div>
          <p className="text-slate-500 max-w-2xl italic">
            Estas são as instituições de Cazengo que já estão a transformar a educação através da partilha de recursos abertos.
          </p>
        </div>

        {/* Grid de Escolas (Representação do Mapa/Lista) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSchools.map((school) => (
            <div 
              key={school.id}
              className="group relative bg-[#0d1f17] rounded-3xl p-8 border border-white/5 overflow-hidden transition-all hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20"
            >
              {/* Efeito Visual de Fundo */}
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-green-500/10 transition-colors">
                <School className="w-32 h-32" />
              </div>

              {/* Etiqueta / Badge (No topo do ícone) */}
              <div className="inline-flex items-center gap-2 bg-green-500 text-[#0d1f17] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-6 animate-pulse">
                Nova Partilha
              </div>

              {/* Ícone da Escola */}
              <div className="relative z-10 bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-green-500 group-hover:border-green-400 transition-all">
                <School className="w-8 h-8 text-green-400 group-hover:text-[#0d1f17]" />
              </div>

              {/* Informações */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {school.name}
                </h3>
                <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
                  <MapPin className="w-3 h-3" />
                  {school.location}
                </div>

                {/* Estatísticas da Escola (Coletadas via Usuário/Recurso) */}
                <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{school.resourcesCount}</span>
                    <span className="text-white/40 text-[10px] uppercase flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> REAs
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{school.teachersCount}</span>
                    <span className="text-white/40 text-[10px] uppercase flex items-center gap-1">
                      <Users className="w-3 h-3" /> Autores
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem de Incentivo */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
          <p className="text-slate-600 font-medium">
            Não vê a sua escola aqui? Faça login, selecione a sua instituição e comece a publicar recursos.
          </p>
        </div>

      </div>
    </section>
  );
}

export default SchoolMap