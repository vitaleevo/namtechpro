
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-display font-black text-primary dark:text-white mb-12">Política de Privacidade</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-500 mb-8 italic">Última atualização: Outubro de 2024</p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Recolha de Dados</h2>
            <p>A Namtech Pro recolhe informações pessoais apenas quando necessário para lhe fornecer os nossos serviços técnicos. Os dados recolhidos incluem:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome e Email Profissional (para formulários de contacto).</li>
              <li>Dados de localização da embarcação (apenas se partilhados para assistência).</li>
              <li>Histórico de mensagens com o assistente AI para melhoria do serviço técnico.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Utilização dos Dados</h2>
            <p>Utilizamos os seus dados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a pedidos de cotação e suporte técnico.</li>
              <li>Enviar atualizações sobre manutenção de sistemas críticos.</li>
              <li>Melhorar a precisão das respostas do nosso motor de inteligência artificial.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Proteção e Partilha</h2>
            <p>Não vendemos nem partilhamos os seus dados com terceiros para fins publicitários. Os dados podem ser partilhados com parceiros tecnológicos (fabricantes) apenas quando necessário para ativação de garantias ou reparações oficiais.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
            <p>Utilizamos cookies técnicos para garantir o funcionamento correto do site e para lembrar as suas preferências de idioma e modo de visualização (claro/escuro).</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Seus Direitos</h2>
            <p>Pode solicitar o acesso, retificação ou eliminação dos seus dados pessoais a qualquer momento enviando um email para <strong>privacidade@namtechpro.ao</strong>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
