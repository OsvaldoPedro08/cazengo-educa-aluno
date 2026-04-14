import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpenText, Facebook, Star, Send, X, User, Mail, 
  Tag, Phone, MapPin, ChevronRight, MessageSquare 
} from 'lucide-react';

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [formData, setFormData] = useState({
    nome: "", 
    assunto: "Sugestão", 
    mensagem: ""
  });

  const ratingLabels = {
    1: "Mau", 2: "Razoável", 3: "Bom", 4: "Muito Bom", 5: "Excelente"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 5000);
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    
    const feedbackCompleto = { ...formData, estrelas: rating, data: new Date().toISOString() };
    
    console.log("Feedback para API:", feedbackCompleto);
    
    //triggerToast("")
    alert("Obrigado, " + formData.nome + "! A sua avaliação foi enviada com sucesso.");
    
    setIsModalOpen(false);
    setRating(0);
    setFormData({ nome: "", assunto: "Sugestão", mensagem: "" });
  };

  return (
    <>
      <footer className="bg-[#0d1f17] text-white pt-16 pb-8 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Grid Principal do Footer */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center gap-2">
                <BookOpenText className="text-green-500 w-8 h-8" />
                <span className="text-xl font-bold uppercase tracking-tighter">Cazengo EDUCA</span>
              </Link>
              <p className="text-white/40 leading-relaxed text-sm">
                Plataforma de Recursos Educativos Abertos do município de Cazengo, promovendo a partilha de conhecimento na comunidade educacional.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all text-white">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Plataforma */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-500 uppercase tracking-widest">Plataforma</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link to="/explorar" className="hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Explorar Recursos</Link></li>
                <li><Link to="/partilhar-recurso" className="hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Partilhar Recurso</Link></li>
                <li><Link to="/licencas" className="hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Licenças</Link></li>
                <li><Link to="#" className="hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Sobre o projeto</Link></li>
                <li><Link to="/partilhar-recurso" className="hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3"/> Perguntas Frequentes</Link></li>
              </ul>
            </div>

            {/* Institucional */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-500 uppercase tracking-widest">Links</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><Link to="https://creativecommons.org.licenses/by-sa/4.0/deed.pt" className="hover:text-white">CC BY-SA 4.0</Link></li>
                <li><Link to="https://creativecommons.org.licenses/by/4.0/legalcode.pt" className="hover:text-white">CC BY 4.0</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-500 uppercase tracking-widest">Contacto</h4>
              <ul className="space-y-3 text-white/40 text-sm">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600"/> N'dalatando, Cazengo, Cuanza Norte, Angola</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-600"/> contacto@cazengoeduca.ao</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-600"/> +244 923 000 000</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-white/20 text-[10px] uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Cazengo EDUCA. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Termos de Uso</a>
              <a href="#" className="hover:text-white">Política de Privacidade</a>
            </div>
          </div>
          
        </div>
      </footer>

      {/* --- BOTÃO FLUTUANTE --- */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="animate-bounce fixed bottom-8 right-8 bg-[#f59e0b] hover:bg-yellow-600 text-[#0d1f17] px-6 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-3 hover:scale-105 transition-all z-40"
      >
        <Star className="w-6 h-6 fill-[#0d1f17]" />
        Avaliar
      </button>

      {/* --- MODAL DE AVALIAÇÃO --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          {/* Fundo Cinza Antracite conforme imagem */}
          <div className="bg-[#1e2329] border border-white/5 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/20 hover:text-white"><X className="w-5 h-5"/></button>

            <div className="text-center mb-6">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="text-yellow-500 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Avaliar Plataforma</h3>
              <p className="text-white/40 text-xs">Sua opinião ajude-nos a construir uma ferramenta melhor para Cazengo.</p>
            </div>

            <form onSubmit={handleSendFeedback} className="space-y-4">
                {/* Área de Estrelas */}
                <div className="bg-[#2b3139]/50 p-4 rounded-xl border border-white/5 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button key={num} type="button" onClick={() => setRating(num)}>
                        <Star className={`w-8 h-8 transition-all ${rating >= num ? 'fill-yellow-500 text-yellow-500' : 'text-white/10'}`} />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{ratingLabels[rating]}</p>}
                </div>

              <div className="space-y-3">
                    {/* Inputs com fundo cinza ligeiramente mais claro */}
                    <div className='py-1'>
                        <label className="text-white/60 text-xs font-bold uppercase ml-1 tracking-wider">Seu Nome (Opcional)</label>
                        <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                        <input name="nome" type="text" value={formData.nome} onChange={handleChange} placeholder="Ex: Osvaldo Pedro" className="w-full bg-[#2b3139] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-yellow-500/50 outline-none transition-all placeholder:text-white/20" />
                        </div>
                    </div>

                    <div className='py-1'>
                        <label className="text-white/60 text-xs font-bold uppercase ml-1 tracking-wider">Assunto do Feedback</label>
                        <div className="relative">
                        <Tag className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                        <select name="assunto" value={formData.assunto} onChange={handleChange} className="w-full bg-[#2b3139] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-yellow-500/50 outline-none appearance-none cursor-pointer">
                            <option value="Sugestão">Sugestão de Melhoria</option>
                            <option value="Erro no Sistema">Reportar Erro / Bug</option>
                            <option value="Elogio">Elogio à Plataforma</option>
                            <option value="Dúvida">Dúvida Técnica</option>
                        </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-white/60 text-xs font-bold uppercase ml-1 tracking-wider">Mensagem</label>
                        <textarea required name='mensagem' value={formData.mensagem} onChange={handleChange} placeholder="Sua mensagem..." className="w-full bg-[#2b3139] border border-white/5 rounded-lg p-3 text-sm text-white focus:border-yellow-500/50 outline-none h-24 resize-none placeholder:text-white/20"></textarea>
                    </div>
              </div>

              <button type="submit" disabled={rating === 0} className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0d1f17] py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/10">
                <Send className="w-4 h-4" /> ENVIAR AVALIAÇÃO
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer