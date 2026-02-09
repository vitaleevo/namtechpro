
import React from 'react';

const HumanResources: React.FC = () => {
  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Equipa Namtech" 
            className="w-full h-full object-cover scale-105" 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000" 
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-md"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block animate-fade-in-down">Capital Humano</span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-tight">
              O Nosso Maior Ativo são as <span className="text-secondary">Pessoas</span>
            </h1>
            <p className="text-xl text-slate-100 mb-10 leading-relaxed font-light">
              Na Namtech Pro, acreditamos que a tecnologia só alcança a excelência através do talento humano e da formação contínua.
            </p>
            <div className="flex justify-center gap-4">
               <button className="px-10 py-5 bg-secondary text-primary rounded-xl font-black text-lg hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                 Candidatura Espontânea
                 <span className="material-symbols-outlined">person_add</span>
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Culture */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">A Vida na Namtech Pro</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Mais do que um emprego, uma plataforma para o seu desenvolvimento profissional em Angola.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Namtech Academy', 
                desc: 'Investimos centenas de horas anuais em formação técnica certificada pelos fabricantes (Furuno, Icom, Simrad).',
                icon: 'school',
                benefit: 'Certificações Internacionais'
              },
              { 
                title: 'Bem-estar & Saúde', 
                desc: 'Um ambiente seguro com plano de saúde premium e programas de apoio à família e equilíbrio vida-trabalho.',
                icon: 'volunteer_activism',
                benefit: 'Plano de Saúde Familiar'
              },
              { 
                title: 'Carreira Global', 
                desc: 'Oportunidade de trabalhar em projetos de grande escala e missões internacionais de suporte técnico.',
                icon: 'trending_up',
                benefit: 'Plano de Carreira Estruturado'
              }
            ].map((pillar, i) => (
              <div key={i} className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-secondary transition-all group">
                <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-sm">{pillar.desc}</p>
                <div className="inline-block py-2 px-4 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {pillar.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Journey */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">O Seu Caminho <br/><span className="text-secondary">Connosco</span></h2>
              <div className="space-y-10 relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10 hidden md:block"></div>
                {[
                  { step: '01', title: 'Candidatura Online', desc: 'Envie o seu CV e portfólio através do nosso portal ou email de carreiras.' },
                  { step: '02', title: 'Entrevista Técnica', desc: 'Conversa com os nossos engenheiros seniores para avaliar competências.' },
                  { step: '03', title: 'Avaliação Prática', desc: 'Um dia nas nossas oficinas para demonstrar as suas capacidades em ambiente real.' },
                  { step: '04', title: 'Onboarding Namtech', desc: 'Integração na equipa e início do programa de formação na Academy.' }
                ].map((s, i) => (
                  <div key={i} className="flex gap-10 relative z-10 group">
                    <span className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center text-xs font-black shadow-[0_0_20px_rgba(255,184,28,0.3)]">{s.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{s.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 relative">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team Collaboration" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-all cursor-pointer">
                   <div className="w-20 h-20 rounded-full bg-secondary text-primary flex items-center justify-center animate-pulse">
                     <span className="material-symbols-outlined text-4xl">play_arrow</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Employees) */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Vozes da Nossa Equipa</h2>
            <div className="h-1 w-20 bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Eng. Paulo Mendes', role: 'Técnico Sénior (Radar)', quote: 'Entrei como estagiário e hoje lidero equipas em projectos críticos no Porto de Luanda. A Namtech acreditou no meu potencial.' },
              { name: 'Dra. Maria Silva', role: 'Diretora de Operações', quote: 'Aqui, a meritocracia é real. Valorizamos quem tem fome de aprender e compromisso com a excelência técnica.' },
              { name: 'Ricardo Santos', role: 'Especialista em Logística', quote: 'Gerir o stock de peças críticas para navios em todo o país é um desafio que me motiva todos os dias.' }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">format_quote</span>
                <p className="text-slate-600 dark:text-slate-400 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-xs">
                     {t.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div>
                     <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                     <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{t.role}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-display font-bold text-primary dark:text-white mb-6">Vagas em Aberto</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Estamos sempre à procura de engenheiros, técnicos de eletrónica e especialistas em logística para reforçar a nossa operação no Namibe e Luanda.
              </p>
              <div className="space-y-4">
                {[
                  { pos: 'Técnico de Manutenção Eletrónica', loc: 'Namibe', type: 'Full-time', urgency: 'Alta' },
                  { pos: 'Especialista em Redes VSAT', loc: 'Luanda', type: 'Full-time', urgency: 'Normal' },
                  { pos: 'Engenheiro de Sistemas Híbridos', loc: 'Namibe', type: 'Full-time', urgency: 'Alta' },
                  { pos: 'Estágio Profissional (Eletrónica)', loc: 'Soyo', type: 'Estágio', urgency: 'Normal' }
                ].map((job, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-lg group-hover:text-primary dark:group-hover:text-secondary transition-colors">{job.pos}</h4>
                        {job.urgency === 'Alta' && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[8px] font-black rounded uppercase">Urgente</span>}
                      </div>
                      <p className="text-sm text-slate-500">{job.loc} • {job.type}</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-2">arrow_forward_ios</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
               <img 
                 src="https://images.unsplash.com/photo-1600880212319-78d7e52b22b1?auto=format&fit=crop&q=80&w=800" 
                 alt="Working at Namtech" 
                 className="rounded-[3rem] shadow-2xl border-4 border-white dark:border-slate-800"
               />
               <div className="absolute -bottom-8 -left-8 bg-secondary p-8 rounded-3xl shadow-xl max-w-[240px]">
                 <p className="text-primary font-black text-3xl mb-1">98%</p>
                 <p className="text-primary/70 text-xs font-bold uppercase tracking-widest">Taxa de Retenção de Talentos</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Não encontrou a vaga ideal?</h2>
          <p className="text-slate-500 mb-10">
            Estamos sempre atentos a novos talentos. Envie-nos o seu CV e entraremos em contacto assim que surgir uma oportunidade que se alinhe ao seu perfil.
          </p>
          <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto">
            Enviar Candidatura Espontânea
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HumanResources;
