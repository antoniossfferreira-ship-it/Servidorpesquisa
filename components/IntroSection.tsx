
import React from 'react';
import { Target, Users, Lightbulb, Calendar } from 'lucide-react';

interface IntroSectionProps {
  onStart: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Sua voz constrói o futuro da UNEB</h2>
          <p className="text-blue-100 text-lg max-w-2xl mb-8">
            Participe da elaboração do Plano Anual de Capacitação (PAC) 2026. 
            Ajude-nos a definir as trilhas de aprendizagem que irão transformar nossa carreira e a universidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-lg border border-blue-700 backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold text-white">Prazo: 20/01 a 30/01</span>
            </div>
          </div>

          <button 
            onClick={onStart}
            className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Iniciar Pesquisa
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Objetivo Geral</h3>
          <p className="text-slate-600 text-sm">Promover o desenvolvimento contínuo das competências técnicas comportamentais e gerenciais para otimizar processos de trabalho.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Inovação</h3>
          <p className="text-slate-600 text-sm">Desenvolver cultura digital e de inovação na gestão pública, reduzindo falhas e retrabalho.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="font-bold text-slate-900 mb-2">Público-Alvo</h3>
          <p className="text-slate-600 text-sm">Servidores técnicos, gestores, docentes, coordenadores e setores administrativos correlatos.</p>
        </div>
      </div>
    </div>
  );
};
