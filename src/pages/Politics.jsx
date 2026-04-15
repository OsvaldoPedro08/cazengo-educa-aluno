import Footer from "../components/home/Footer"

import React from 'react';
import { ShieldCheck, Eye, Database, Globe, UserCheck, Mail } from 'lucide-react';

function Politics() {
  const lastUpdated = "15 de Abril de 2026";

  const policySections = [
    {
      id: "data-collection",
      icon: <Database className="text-blue-600" size={20} />,
      title: "Recolha de Dados",
      description: "Recolhemos apenas as informações estritamente necessárias para o funcionamento da plataforma, como o seu nome, endereço de e-mail e perfil (Professor, Estudante e Encarregado de Educação)."
    },
    {
      id: "data-usage",
      icon: <Eye className="text-blue-600" size={20} />,
      title: "Finalidade do Uso",
      description: "Os seus dados são utilizados para personalizar a sua experiência, permitir o upload de recursos em seu nome e enviar notificações importantes sobre as suas contribuições."
    },
    {
      id: "protection",
      icon: <ShieldCheck className="text-blue-600" size={20} />,
      title: "Segurança da Informação",
      description: "Implementamos medidas de segurança técnica para proteger os seus dados contra acessos não autorizados ou divulgação indesejada no ambiente digital."
    },
    {
      id: "sharing",
      icon: <Globe className="text-blue-600" size={20} />,
      title: "Partilha com Terceiros",
      description: "O Cazengo EDUCA não vende nem aluga os seus dados pessoais. A partilha só ocorre se for legalmente exigido pelas autoridades competentes da República de Angola."
    },
    {
      id: "user-rights",
      icon: <UserCheck className="text-blue-600" size={20} />,
      title: "Os Seus Direitos",
      description: "Como utilizador, tem o direito de aceder, corrigir ou solicitar a eliminação definitiva dos seus dados da nossa base de dados a qualquer momento."
    }
  ];

  return (
    <div>
        <div className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Política de Privacidade</h1>
                    <p className="text-slate-500 font-medium">
                        Saiba como protegemos os seus dados na Cazengo EDUCA.
                    </p>
                    <div className="mt-4 inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                        Atualizado em: {lastUpdated}
                    </div>
                </div>

                {/* Content Body */}
                <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/40">
                    <div className="space-y-12">
                        {policySections.map((section) => (
                        <div key={section.id} className="flex flex-col md:flex-row gap-6">
                            <div className="shrink-0">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                                    {section.icon}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-800 mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Contact Support Box */}
                    <div className="mt-16 p-8 bg-blue-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <Mail size={32} className="shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg">Tem dúvidas sobre a sua privacidade?</h3>
                                <p className="text-blue-100 text-sm">Estamos aqui para esclarecer qualquer ponto.</p>
                            </div>
                        </div>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-100 transition-all">
                            Contactar Encarregado
                        </button>
                    </div>
                </div>

                {/* Legal Footer Note */}
                <p className="mt-12 text-center text-slate-400 text-xs leading-relaxed max-w-2xl mx-auto italic">
                Esta política de privacidade foi desenhada para cumprir com as boas práticas de proteção de dados e apoiar a transparência na comunidade educativa de Cazengo.
                </p>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
  );
}

export default Politics