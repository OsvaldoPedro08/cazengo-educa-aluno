import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, AlertCircle, CheckCircle, 
  Image as ImageIcon, X, Send, Film, Trash2, User
} from 'lucide-react';

export function Publish() {
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [file, setFile] = useState(null);
  const [capaFile, setCapaFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isNotVideo, setIsNotVideo] = useState(false);
  const fileInputRef = useRef(null);

  //estados para capturar os inputs
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "Ciências Exatas",
    disciplina: "",
    classe: "",
    licenca_id: "1",
    autor_nome: "",
    escola: "Escola Missionária Santa Maria Goretti"
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //mostra as mensagens popup de sucesso ao partilhar arquivo e de erro caso o arquivo for > 50mb
  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 5000);
  };

  //verifica se o arquivo é maior que 50mb
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        triggerToast("O arquivo excede o limite de 50MB!", "Erro");
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      const isVideo = selectedFile.type.startsWith('video/');
      setIsNotVideo(!isVideo);
      
      if (isVideo) {
        setVideoPreview(URL.createObjectURL(selectedFile));
      } else {
        setVideoPreview(null);
      }
    }
  };

  //remove os arquivos
  const removeMainFile = () => {
    setFile(null);
    setVideoPreview(null);
    setIsNotVideo(false);
    setCapaFile(null); // Limpa a capa se o arquivo principal sair
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- CAPTURA DE DADOS PARA API ---
    const dataToSend = new FormData();
    dataToSend.append("titulo", formData.titulo);
    dataToSend.append("descricao", formData.descricao);
    dataToSend.append("categoria", formData.categoria);
    dataToSend.append("disciplina", formData.disciplina);
    dataToSend.append("classe", formData.classe);
    dataToSend.append("licenca_id", formData.licenca_id);
    dataToSend.append("autor_nome", formData.autor_nome);
    dataToSend.append("escola", formData.escola);
    dataToSend.append("arquivo", file);
    if (capaFile) dataToSend.append("capa", capaFile);

    console.log("Payload pronto para Node.js:", Object.fromEntries(dataToSend));
    
    // Simulação de envio
    triggerToast("Recurso enviado para revisão!");
  };

  return (
    <div className="min-h-screen bg-white pt-10 pb-12 px-6">
      <div className="container mx-auto max-w-2xl">
        
        <button className="mb-6 group relative flex items-center bg-[#1e2329] text-white pr-8 pl-14 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
            {/* O Ícone Flutuante (O Segredo) */}
            <div className="absolute -left-4 -top-2 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:rotate-12 transition-transform">
            <Upload className="text-[#0d1f17] w-6 h-6" strokeWidth={3} />
            </div>

            {/* O Texto */}
            <span className="text-sm uppercase tracking-widest font-black">
                Partilhar REA
            </span>
        </button>

        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Partilhar Novo Recurso</h1>
          <p className='text-sm pb-6'>Partilhe o seu material educativo com a comunidade acadêmica de Cazengo.</p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl flex items-start gap-3">
            <AlertCircle className="text-blue-500 w-5 h-5 shrink-0" />
            <p className="text-blue-900 text-sm">
                <strong>Atenção:</strong> Ao partilhar o seu recurso, está a ajudar a fortalecer o ensino no nosso 
                município. Informamos que, para garantir a qualidade e a segurança dos materiais, todos 
                os ficheiros passam por uma revisão técnica e pedagógica da nossa equipa antes de ficarem 
                visíveis publicamente. Assim que o seu recurso for validado, receberá uma notificação. 
                Obrigado por colaborar com a Cazengo EDUCA!
            </p>
          </div>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
          <h4 className='font-bold text-slate-900 mb-6'>Informações do Recurso</h4>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Título do Recurso*</label>
              <input required name="titulo" onChange={handleInputChange} type="text" placeholder="Ex: Guia de Matemática para a 8ª Classe" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Descrição do Conteúdo</label>
              <textarea name="descricao" onChange={handleInputChange} placeholder="Descreva brevemente o conteúdo e objectivo do recurso..." className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none h-24 resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Categoria</label>
              <select required name="categoria" onChange={handleInputChange} className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none bg-white">
                <option>Ensino Primário</option>
                <option>Ciências Exatas</option>
                <option>Ciências Sociais</option>
                <option>Línguas e Literatura</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-bold text-sm ml-1">Disciplina</label>
                <input required name="disciplina" onChange={handleInputChange} type="text" placeholder="Ex: Matemática" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-bold text-sm ml-1">Classe / Ano</label>
                <input required name="classe" onChange={handleInputChange} type="text" placeholder="Ex: 8ª Classe" className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Licença de Uso (REA)</label>
              <select name="licenca_id" onChange={handleInputChange} className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none bg-white">
                <option value="1">CC BY - Atribuição</option>
                <option value="2">CC BY-SA - Atribuição e Partilha</option>
                <option value="3">CC BY-NC - Não Comercial</option>
                <option value="4">CC0 - Domínio Público</option>
              </select>
            </div>

            {/* Card do Autor */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2 block tracking-tight">Autor do Recurso</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input required name="autor_nome" onChange={handleInputChange} type="text" placeholder="Nome Completo" className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-slate-500 font-bold text-[10px] uppercase tracking-widest block tracking-tight">Escola</label>
                <select required name="escola" onChange={handleInputChange} className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none bg-white">
                    <option>Escola Missionária Santa Maria Goretti</option>
                    <option>ITS - Instituto Médio de Saúde</option>
                    <option>Colégio Pitágoras</option>
                    <option>Escola Missionária São João Baptista</option>
                </select>
              </div>
            </div>

            {/* Bloco de Arquivos */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-bold text-sm flex justify-between items-center">
                  Anexar Arquivo Principal
                  <span className="text-[10px] text-slate-400">Limite Máx: 50MB</span>
                </label>
                
                <div className={`relative border-2 border-dashed rounded-2xl transition-all ${file ? 'border-green-300 bg-green-50/30' : 'border-slate-200 bg-slate-50 hover:border-green-400'}`}>
                  {!file ? (
                    <div className="py-10 flex flex-col items-center">
                      <Upload className="text-slate-300 w-10 h-10 mb-2" />
                      <p className="text-slate-500 text-sm font-medium">Carregar material (PDF, DOCX, PPTX, MP4)</p>
                      <input ref={fileInputRef} required type="file" accept=".pdf,.docx,.pptx,.mp4" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  ) : (
                    <div className="p-4 animate-fade-in-up">
                      {videoPreview && (
                        <div className="mb-4 rounded-xl overflow-hidden bg-black aspect-video border border-slate-200 shadow-inner">
                          <video src={videoPreview} controls className="w-full h-full" />
                        </div>
                      )}
                      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            {videoPreview ? <Film size={18} /> : <FileText size={18} />}
                          </div>
                          <span className="text-xs font-bold text-slate-700 truncate max-w-[220px]">{file.name}</span>
                        </div>
                        <button type="button" onClick={removeMainFile} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input da Capa (Dinâmico) */}
              {isNotVideo && file && (
                <div className="flex flex-col gap-2 animate-fade-in-up">
                  <label className="text-slate-700 font-bold text-sm ml-1">Capa do Recurso (Imagem)</label>
                  <div className="relative border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                    <ImageIcon className="text-slate-400 w-5 h-5" />
                    <input 
                      name="capa" 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setCapaFile(e.target.files[0])}
                      className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 cursor-pointer" 
                    />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5">
              <Send size={22} /> PARTILHAR RECURSO
            </button>
          </form>
        </div>

        {/* Toast Persistente */}
        {toast.show && (
          <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-fade-in-left z-50 border ${toast.type === 'success' ? 'bg-slate-900 border-green-500/30 text-white' : 'bg-red-600 border-red-400 text-white'}`}>
            <div className="p-2 bg-white/10 rounded-full">
              {toast.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            </div>
            <div>
              <p className="font-bold text-sm">{toast.type === 'success' ? "Sucesso!" : "Erro de Arquivo"}</p>
              <p className="text-[11px] opacity-80">{toast.message}</p>
            </div>
            <button onClick={() => setToast({ ...toast, show: false })} className="ml-4 opacity-40 hover:opacity-100"><X size={18} /></button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Publish