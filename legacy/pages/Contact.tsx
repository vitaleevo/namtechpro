
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Geral',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    if (value && !validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }

    setStatus('loading');
    // Simulação de envio para o backend
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'Geral', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-black text-primary dark:text-white mb-4">
            Entre em <span className="text-secondary">Contacto</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A nossa equipa técnica está pronta para responder às suas necessidades operacionais em todo o território nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informações de Contacto */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              
              <h3 className="text-2xl font-bold mb-8 relative z-10">Escritório Central</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <div>
                    <p className="font-bold">Namibe, Angola</p>
                    <p className="text-sm text-slate-300">Zona Industrial, Rua Principal, Moçâmedes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">call</span>
                  <div>
                    <p className="font-bold">Telefone 24/7</p>
                    <p className="text-sm text-slate-300">+244 9XX XXX XXX</p>
                    <p className="text-sm text-slate-300">+244 2XX XXX XXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <div>
                    <p className="font-bold">Email Técnico</p>
                    <p className="text-sm text-slate-300">suporte@namtechpro.ao</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">Horário de Atendimento</p>
                <p className="text-sm">Seg - Sex: 08:00 - 18:00</p>
                <p className="text-sm">Sáb: 09:00 - 13:00</p>
                <p className="text-xs text-slate-400 mt-4 italic">*Assistência de emergência disponível 24/7 para contratos Gold.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">help_center</span>
              </div>
              <div>
                <h4 className="font-bold">Precisa de Ajuda Imediata?</h4>
                <p className="text-xs text-slate-500">Utilize o nosso assistente AI no canto inferior direito.</p>
              </div>
            </div>
          </div>

          {/* Formulário de Contacto */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">Mensagem Enviada!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                  Obrigado por contactar a Namtech Pro. Um dos nossos especialistas técnicos entrará em contacto num prazo de 24 horas.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: João Manuel"
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Profissional</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleEmailChange}
                      placeholder="exemplo@empresa.ao"
                      className={`w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none transition-all dark:text-white ${
                        emailError 
                          ? 'border-red-500 focus:ring-red-500' 
                          : formData.email && !emailError 
                            ? 'border-emerald-500 focus:ring-emerald-500' 
                            : 'border-slate-200 dark:border-slate-700 focus:ring-primary'
                      }`}
                    />
                    {emailError && (
                      <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">Por favor, introduza um email válido.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefone / WhatsApp</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+244"
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Assunto</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                    >
                      <option value="Geral">Informações Gerais</option>
                      <option value="Orcamento">Pedido de Orçamento</option>
                      <option value="Suporte">Suporte Técnico</option>
                      <option value="Energia">Consultoria Energética</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Mensagem ou Descrição Técnica</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Descreva detalhadamente a sua necessidade..."
                    className="w-full px-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      A Processar...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
