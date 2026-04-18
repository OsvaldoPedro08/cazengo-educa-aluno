import React, { useState, useMemo } from 'react';
import { 
  Info, Search, ShieldCheck, CreativeCommons, 
  Copyright, FileWarning, HelpCircle 
} from 'lucide-react';
import Footer from '../components/home/Footer';

// Mock de Licenças (Será substituído pela API futuramente)
const MOCK_LICENSES = [
  {
    id: 1,
    sigla: "CC0",
    nome: "Domínio Público",
    descricao: "O autor renuncia a todos os seus direitos autorais sobre a obra em todo o mundo. Qualquer pessoa pode copiar, modificar e distribuir o trabalho, mesmo para fins comerciais, sem pedir permissão.",
    uso: "Ideal para materiais que deseja que sejam totalmente livres e universais."
  },
  {
    id: 2,
    sigla: "CC BY",
    nome: "Atribuição",
    descricao: "Permite que outros distribuam, remixem, adaptem e criem a partir do seu trabalho, mesmo comercialmente, desde que lhe atribuam o devido crédito pela criação original.",
    uso: "A licença mais flexível e recomendada para máxima disseminação de materiais REA."
  },
  {
    id: 3,
    sigla: "CC BY-SA",
    nome: "Atribuição-CompartilhaIgual",
    descricao: "Permite remixar e adaptar, mas as novas criações devem ser licenciadas sob termos idênticos. Todos os novos trabalhos baseados no seu terão a mesma licença.",
    uso: "Usada frequentemente pela Wikipédia e materiais que querem garantir que as derivações continuem livres."
  },
  {
    id: 4,
    sigla: "CC BY-NC",
    nome: "Atribuição-Não Comercial",
    descricao: "Permite que outros remixem e adaptem o trabalho, mas apenas para fins não comerciais. Os novos trabalhos também devem dar crédito ao autor.",
    uso: "Para quem não quer que terceiros lucrem diretamente com o seu material educativo."
  }
];

function Licenses() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de Filtro em Tempo Real
  const filteredLicenses = useMemo(() => {
    return MOCK_LICENSES.filter(lic => 
      lic.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
          <div className="container mx-auto max-w-5xl">
            
            {/* Cabeçalho */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Guia de Licenças</h1>
              <p className="text-slate-500 mt-2 font-medium">Entenda como proteger e partilhar os seus Recursos Educacionais Abertos.</p>
            </div>

            {/* Alerta Informativo sobre REA */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-3xl mb-12 flex gap-4 shadow-sm">
              <Info className="text-blue-600 shrink-0" size={28} />
              <div>
                <h3 className="text-blue-900 font-black uppercase text-xs tracking-widest mb-1">O que são Licenças Abertas?</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  As licenças REA permitem que autores mantenham a propriedade intelectual ao mesmo tempo que autorizam o público a utilizar, 
                  adaptar e redistribuir o conteúdo de forma legal. Escolher a licença correta é o primeiro passo para democratizar o ensino em Cazengo.
                </p>
              </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar por sigla (Ex: CC0) ou descrição..."
                className="w-full bg-white border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all shadow-md text-lg"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Grid de Licenças */}
            {filteredLicenses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                {filteredLicenses.map((license) => (
                  <div 
                    key={license.id} 
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-green-50 p-4 rounded-2xl group-hover:bg-green-600 transition-colors">
                        <ShieldCheck className="text-green-600 group-hover:text-white" size={32} />
                      </div>
                      <span className="text-3xl font-black text-slate-200 group-hover:text-green-100 transition-colors uppercase">
                        {license.sigla}
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-slate-900 mb-3">{license.nome}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {license.descricao}
                    </p>

                    <div className="pt-6 border-t border-slate-50">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Quando usar:</h4>
                      <p className="text-slate-700 text-sm italic font-medium">
                        "{license.uso}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Estado Vazio */
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="bg-slate-100 p-6 rounded-full mb-4">
                  <FileWarning size={48} />
                </div>
                <h3 className="text-xl font-bold">Nenhuma licença disponível</h3>
                <p className="text-sm">Tente ajustar os termos da sua pesquisa.</p>
              </div>
            )}

            {/* Footer de Ajuda */}
            <div className="mt-20 text-center p-10 bg-slate-900 rounded-[3rem] text-white">
              <HelpCircle className="mx-auto mb-4 text-green-400" size={40} />
              <h3 className="text-2xl font-black mb-2">Ainda tem dúvidas?</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                A equipa de suporte do Cazengo EDUCA pode ajudá-lo a escolher a licença ideal para o seu material pedagógico.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-green-900/20">
                Contactar Suporte
              </button>
            </div>
          </div>
        </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Licenses