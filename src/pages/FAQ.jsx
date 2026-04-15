import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import Footer from "../components/home/Footer"

const FAQ_DATA = [
  {
    id: 1,
    pergunta: "O que são Recursos Educacionais Abertos (REA)?",
    resposta: "São materiais de ensino, aprendizagem e investigação que estão sob domínio público ou licenciados de forma aberta, permitindo que qualquer pessoa os utilize, adapte e distribua livremente."
  },
  {
    id: 2,
    pergunta: "Preciso pagar para descarregar os materiais?",
    resposta: "Não. O Cazengo EDUCA é uma plataforma totalmente gratuita dedicada à democratização do conhecimento em Cuanza Norte."
  },
  {
    id: 3,
    pergunta: "Como posso partilhar os meus próprios materiais?",
    resposta: "Basta criar uma conta, clicar no botão Partilhar (REA) ou Partilhar meu recurso, preencher os dados do recurso (como título, descrição, categoria, etc) e escolher uma licença Creative Commons apropriada."
  },
  {
    id: 4,
    pergunta: "Que tipo de licença devo escolher para o meu recurso?",
    resposta: "Recomendamos a licença CC BY (Atribuição), que permite a máxima partilha e adaptação, desde que lhe deem o devido crédito como autor original. Em caso de dúvidas, clicar em Licenças que mais informações sobre os tipos de licenças e como usar lhe serão mostradas."
  },
  {
    id: 5,
    pergunta: "O portal é exclusivo para a comunidade acadêmica de Cazengo?",
    resposta: "Embora o foco inicial seja o município de Cazengo, qualquer educador, educando ou outra entidade interessado na melhoria do ensino pode beneficiar e contribuir para a plataforma."
  }
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-3xl">
                
                {/* Cabeçalho */}
                <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-3xl mb-6">
                    <HelpCircle size={32} />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4">Perguntas Frequentes</h1>
                <p className="text-slate-500 font-medium text-lg">
                    Tudo o que precisas de saber sobre o Cazengo EDUCA e o uso de REAs.
                </p>
                </div>

                {/* Lista de Acordeão */}
                <div className="space-y-4">
                {FAQ_DATA.map((item, index) => (
                    <div 
                    key={item.id}
                    className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between p-7 text-left outline-none"
                    >
                        <span className="font-bold text-slate-800 text-lg pr-4">
                        {item.pergunta}
                        </span>
                        <div className={`shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-green-600' : 'text-slate-400'}`}>
                        <ChevronDown size={24} />
                        </div>
                    </button>

                    {/* Área da Resposta com Animação Simples */}
                    <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="p-7 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                        <div className="bg-slate-50 p-6 rounded-2xl">
                            {item.resposta}
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Call to Action Final */}
                <div className="mt-20 p-10 bg-green-600 rounded-[3rem] text-center text-white shadow-2xl shadow-green-200">
                <MessageCircle className="mx-auto mb-4" size={40} />
                <h2 className="text-2xl font-black mb-2">Não encontrou a sua resposta?</h2>
                <p className="text-green-100 mb-8 max-w-md mx-auto">
                    A nossa equipa técnica em Cazengo está pronta para ajudar com qualquer dificuldade.
                </p>
                <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all">
                    Enviar uma Mensagem
                </button>
                </div>

            </div>
        </div>
        <Footer />
    </div>
  );
}

export default FAQ