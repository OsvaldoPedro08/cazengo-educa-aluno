import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, AlertCircle, CheckCircle, 
  Image as ImageIcon, X, Send, Film, Trash2, User,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';
import { userAuthUser } from '../hooks/userAuth';

export function Publish() {
  
  const { user } = userAuthUser(); //usuario logado

  const [licenses, setLicenses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [file, setFile] = useState(null);
  const [capaFile, setCapaFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isNotVideo, setIsNotVideo] = useState(false);
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  //estados para capturar os inputs
  const [formData, setFormData] = useState({
    title: "", 
    description: "", 
    actor: "",
    url_resource: "", 
    cover_url: "", 
    subject: "",
    grade: "",
    status: "PENDENTE",
    dtregister: "",
    user_id: "",
    license_id: "",
    licenseName: "",
    level_id: "",
  });

  //lista as licenças
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
            const response = await api.get('/Cazengo-Educa/api/licencas/estado/ativa');

            setLicenses(response.data);

      } catch (error) {
        showToast("Erro ao conectar com o servidor!")
      }
    };

    fetchLicenses();

  }, []);

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

  //mostra as mensagens popup de sucesso ao partilhar arquivo e de erro caso o arquivo for > 50mb
  const showToast = (msg) => {
    setToast({ show: true, message : msg });
    setTimeout(() => setToast({ show: false, message: ""  }), 3000);
  };

  // --- formatar tamanho do arquivo ---
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  //verifica se o arquivo é maior que 50mb
  const handleFileChange = (e) => {
    
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
    
      if (selectedFile.size > 50 * 1024 * 1024) {
    
        showToast("O arquivo excede o limite de 50MB!");
        return;
    
      }
    
      setFile(selectedFile);
    
      const isVideo = selectedFile.type.startsWith('video/');
    
      setIsNotVideo(!isVideo);
      
      if (isVideo) {
    
        setVideoPreview(URL.createObjectURL(selectedFile));
    
        setCapaFile(null); 
    
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

  //salvar no banco
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    if (!file) return showToast("Anexe um arquivo PDF ou Vídeo para continuar!", "error");

    const data = new FormData();

    //adicionar os campos de textos
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("actor", formData.actor);
    data.append("subject", formData.subject);
    data.append("grade", formData.grade);
    data.append("license_id", formData.license_id);
    data.append("user_id", user.id); // depois trocar para formData.user_id quando estiver logado
    data.append("level_id", formData.level_id);
    data.append("status", formData.status || "PENDENTE");

    //busca o nome da licença
    const selectedLic = licenses?.find(lic => lic.idlicense === Number(formData.license_id));

    if(selectedLic) {

      data.append("licenseName", selectedLic.name);

    } else {
      data.append("licenseName", "Cazengo EDUCA")
    }

    data.append("url_resource", file);
    
    if (capaFile) {
    
      data.append("cover_url", capaFile);
    
    }

    try {
          await api.post('/Cazengo-Educa/api/recursos/novo', data);

          showToast("Recurso Enviado para Revisão!");

          removeMainFile();

    } catch (err) {
      showToast("Erro ao Publicar Recurso!");
    }

  };

  return (
    <div className="min-h-screen bg-white pt-10 pb-12 px-6">
      <div className="container mx-auto max-w-2xl">
        
        <button className="mb-6 group relative flex items-center bg-[#1e2329] text-white pr-8 pl-14 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20">
            <div className="absolute -left-4 -top-2 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:rotate-12 transition-transform">
              <Upload className="text-[#0d1f17] w-6 h-6" strokeWidth={3} />
            </div>

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
              <input
               required
               value={formData.title}
               onChange={e => setFormData({...formData, title: e.target.value})}
               type="text" 
               placeholder="Ex: Guia de Matemática para a 8ª Classe" 
               className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Descrição do Conteúdo</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva brevemente o conteúdo e objectivo do recurso..."
                className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none h-24 resize-none">
              </textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Nível de Ensino</label>
              <select
                required
                value={formData.level_id}
                onChange={e => setFormData({...formData, level_id: e.target.value})}
                className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option value="">Selecionar Nível</option>
                {levels.map((le) => (
                  <option key={le.idlevel} value={le.idlevel}>{le.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-bold text-sm ml-1">Disciplina</label>
                <input 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  type="text"
                  placeholder="Ex: Matemática"
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-slate-700 font-bold text-sm ml-1">Classe / Ano</label>
                <input 
                  required
                  value={formData.grade}
                  onChange={e => setFormData({...formData, grade: e.target.value})} 
                  type="text" 
                  placeholder="Ex: 8ª Classe" 
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>

            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-700 font-bold text-sm ml-1">Licença de Uso (REA)</label>
              <select
                required
                value={formData.license_id}
                onChange={e => setFormData({...formData, license_id: e.target.value})} 
                className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option value="">Selecionar Licença</option>
                {licenses.map((lic) => (
                  <option key={lic.idlicense} value={lic.idlicense}>{lic.name}</option>
                ))}
              </select>
            </div>

            {/* Card do Autor */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-2 block tracking-tight">Autor do Recurso</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input 
                required
                value={formData.actor}
                onChange={e => setFormData({...formData, actor: e.target.value})} 
                type="text" 
                placeholder="Nome Completo" 
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 outline-none" 
                />
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
                      <input 
                        required
                        ref={fileInputRef}  
                        type="file"
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
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
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{formatFileSize(file.size)}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={removeMainFile} 
                          className="text-slate-300 hover:text-red-500">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* INPUT DE CAPA - MOSTRA APENAS SE FOR PDF/DOCUMENTO */}
              {isNotVideo && file && (
                <div className="flex flex-col gap-2 animate-fade-in-up">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4 block italic">Capa do Documento</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-green-400 transition-all relative">
                    <div className="bg-white p-4 rounded-2xl text-slate-400">
                      <ImageIcon size={24} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-black text-slate-700">{capaFile ? capaFile.name : "Adicionar uma imagem de capa"}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">JPG ou PNG (Recomendado)</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setCapaFile(e.target.files[0])} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                    {capaFile && (
                       <button onClick={() => setCapaFile(null)} type="button" className="relative z-10 bg-red-50 p-2 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        <X size={16} />
                       </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5">
              <Send size={22} /> 
              PARTILHAR RECURSO
            </button>
          </form>
        </div>

        {/* Toast */}
        {toast.show && (
        <div className="fixed bottom-8 left-8 bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-in slide-in-from-left-10 duration-300 z-[200]">
          <CheckCircle2 className="text-green-400" size={20} />
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      </div>
    </div>
  );
}

export default Publish