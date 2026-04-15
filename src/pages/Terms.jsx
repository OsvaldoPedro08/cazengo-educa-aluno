import React from 'react';
import { ShieldCheck, FileText, Scale, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Footer from "../components/home/Footer"

function Terms() {
  const lastUpdated = "15 de Abril de 2026";

  const sections = [
    {
      id: "acceptance",
      icon: <CheckCircle2 className="text-green-600" size={20} />,
      title: "Aceitação dos Termos",
      content: "Ao aceder e utilizar o Cazengo EDUCA, o utilizador concorda em cumprir e vincular-se aos presentes termos e condições. Esta plataforma foi criada para apoiar a comunidade acadêmica de Cuanza Norte através da partilha de Recursos Educacionais Abertos (REA)."
    },
    {
      id: "usage",
      icon: <FileText className="text-green-600" size={20} />,
      title: "Uso da Plataforma",
      content: "A plataforma deve ser utilizada exclusivamente para fins educativos e profissionais. É estritamente proibido o upload de conteúdos ofensivos, publicitários ou que violem os direitos humanos e a legislação angolana vigente."
    },
    {
      id: "intellectual-property",
      icon: <ShieldCheck className="text-green-600" size={20} />,
      title: "Propriedade Intelectual e REA",
      content: "Todo o conteúdo partilhado deve ser acompanhado de uma licença Creative Commons. O autor mantém a sua propriedade intelectual, mas concede à comunidade o direito de utilizar o material conforme os termos da licença escolhida (ex: CC BY, CC BY-SA)."
    },
    {
      id: "privacy",
      icon: <Lock className="text-green-600" size={20} />,
      title: "Privacidade e Dados",
      content: "Os dados recolhidos durante o registo (como nome e email) são utilizados apenas para a gestão de contas e segurança da plataforma. Não partilhamos dados pessoais com terceiros para fins comerciais."
    },
    {
      id: "liability",
      icon: <Scale className="text-green-600" size={20} />,
      title: "Responsabilidade",
      content: "O Cazengo EDUCA não se responsabiliza pela exatidão científica ou pedagógica dos materiais carregados pelos utilizadores. Cada autor é responsável pelo conteúdo que publica."
    }
  ];

  return (
    <div>
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                
                {/* Header */}
                <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-100 p-3 rounded-2xl">
                            <ShieldCheck className="text-green-600" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                Termos de Uso
                            </h1>
                            <p className="text-slate-500 font-medium italic mt-1">
                                Última atualização: {lastUpdated}
                            </p>
                        </div>
                    </div>
                    
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Bem-vindo ao Cazengo EDUCA. Estes termos regem o uso do nosso serviço. 
                            Pedimos que leia atentamente para entender os seus direitos e deveres 
                            como membro da nossa comunidade acadêmica.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                    {sections.map((section) => (
                        <div 
                            key={section.id}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md"
                            >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-slate-50 p-2 rounded-xl">
                                {section.icon}
                                </div>
                                <h2 className="text-xl font-black text-slate-800">
                                {section.title}
                                </h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-12">
                                {section.content}
                            </p>
                        </div>
                    ))}
                    </div>

                    {/* Important Note Box */}
                    <div className="mt-12 p-8 bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] flex gap-5 items-start">
                        <AlertCircle className="text-amber-500 shrink-0 mt-1" size={28} />
                        <div>
                            <h3 className="font-black text-amber-900 mb-2">Nota Importante para quem vai partilhar recursos</h3>
                            <p className="text-amber-800 text-sm leading-relaxed">
                            Ao partilhar materiais, certifique-se de que não está a violar direitos de autor de livros didáticos comerciais ou de outros colegas. A partilha deve ser sempre ética e legal.
                            </p>
                        </div>
                    </div>

                    {/* Footer Contact */}
                    <div className="mt-20 text-center">
                        <p className="text-slate-500 text-sm">
                            Dúvidas sobre os nossos termos? Entre em contacto com o suporte em{' '}
                            <a href="mailto:suporte@cazengoedu.ao" className="text-green-600 font-bold hover:underline">
                            suporte@cazengoedu.ao
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        <div>
            <Footer />
        </div>
    </div>
  );
}

export default Terms