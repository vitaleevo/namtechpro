
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-display font-black text-primary dark:text-white mb-12">Termos de Serviço</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-500 mb-8 italic">Última atualização: Outubro de 2024</p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p>Ao aceder e utilizar o portal da Namtech Pro, o utilizador concorda em cumprir e estar vinculado aos presentes Termos de Serviço. Caso não concorde com qualquer parte destes termos, não deverá utilizar os nossos serviços digitais.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste site, incluindo textos, imagens, logótipos e software, é propriedade da Namtech Pro ou dos seus parceiros tecnológicos (como Furuno, Icom e Victron Energy) e está protegido por leis de direitos de autor angolanas e internacionais.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Utilização do Serviço</h2>
            <p>O utilizador compromete-se a utilizar o site apenas para fins lícitos e de forma a não infringir os direitos de terceiros ou restringir a utilização do site por outros. É proibido:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Copiar ou reproduzir conteúdo sem autorização prévia por escrito.</li>
              <li>Tentar aceder a áreas restritas do sistema ou bases de dados.</li>
              <li>Utilizar o assistente técnico AI para fins fora do contexto industrial/marítimo.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Limitação de Responsabilidade</h2>
            <p>A Namtech Pro envida todos os esforços para garantir que a informação técnica no site é correta, no entanto, não garantimos a ausência total de erros. As cotações fornecidas online são estimativas e sujeitas a confirmação técnica presencial.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Jurisdição</h2>
            <p>Estes termos são regidos pelas leis da República de Angola. Qualquer litígio será resolvido nos tribunais da Comarca do Namibe.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
