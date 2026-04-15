import React from 'react';
import Footer from "../components/home/Footer"
import { 
  BookOpen, Users, Share2, Globe, Shield, Heart, Info 
} from 'lucide-react';

function About() {
  const Commitment = [
    {
      icon: <BookOpen className="text-green-600" size={24} />,
      titulo: "Recursos Educacionais Abertos",
      descricao: "Materiais didácticos gratuitos criados e partilhados sob licenças Creative Commons."
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      titulo: "Comunidade Docente",
      descricao: "Uma rede de professores de Cazengo que colaboram para melhorar a educação local."
    },
    {
      icon: <Share2 className="text-green-600" size={24} />,
      titulo: "Partilha Livre",
      descricao: "Qualquer indivíduo pode publicar e aceder a recursos sem custos nem restrições."
    },
    {
      icon: <Globe className="text-green-600" size={24} />,
      titulo: "Contexto Local",
      descricao: "Materiais adaptados à realidade de Cuanza Norte e às necessidades dos nossos alunos."
    },
    {
      icon: <Shield className="text-green-600" size={24} />,
      titulo: "Licenças Abertas",
      descricao: "Todos os recursos são protegidos por licenças Creative Commons que garantem a abertura."
    },
    {
      icon: <Heart className="text-green-600" size={24} />,
      titulo: "Impacto Social",
      descricao: "Contribua para a melhoria da educação em Cazengo ao partilhar o seu conhecimento."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Título Principal */}
      <div className="bg-slate-900 pt-32 pb-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Sobre o Cazengo EDUCA
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Uma plataforma dedicada à partilha de recursos educativos abertos entre a comunidade acadêmica do município de Cazengo, Cuanza Norte.
          </p>
        </div>
      </div>

      {/* Conteúdo Explicativo */}
      <div className="container mx-auto max-w-4xl py-20 px-6">
        <section className="mb-20">
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
             O que são Recursos Educacionais Abertos?
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg leading-relaxed">
              Os <strong>Recursos Educacionais Abertos (REA)</strong> são materiais de ensino, aprendizagem e investigação que são de domínio público ou publicados sob uma licença aberta que permite o seu uso, adaptação e redistribuição gratuita. 
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mt-4">
              Na plataforma <strong>Cazengo EDUCA</strong>, os professores podem publicar planos de aula, fichas de exercícios, apresentações, guias de estudo e outros materiais didácticos que podem ser livremente utilizados pela comunidade acadêmica assim como qualquer indivíduo que queira contribuir para melhorar a qualidade de ensino no município.
            </p>
          </div>
        </section>

        {/* Grade de Compromisso (Cards das Imagens) */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
            O Nosso Compromisso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Commitment.map((item, index) => (
              <div 
                key={index} 
                className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-100/50 hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.titulo}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rodapé da Página Sobre */}
      <div className="bg-slate-50 py-20 px-6 text-center mt-10">
        <div className="max-w-2xl mx-auto">
          <Info className="mx-auto text-green-600 mb-4" size={40} />
          <p className="text-slate-500 font-medium">
            Juntos, estamos a construir o futuro da educação em Angola, começando pela nossa comunidade acadêmica em Cazengo.
          </p>
        </div>
      </div>

       <Footer />
    </div>
  );
}

export default About