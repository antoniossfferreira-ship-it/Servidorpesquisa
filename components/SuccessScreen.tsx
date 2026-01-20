import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in space-y-8">
      <div className="bg-green-100 p-6 rounded-full">
        <CheckCircle className="w-20 h-20 text-green-600" />
      </div>
      
      <div className="space-y-4 max-w-lg">
        <h2 className="text-3xl font-bold text-slate-900">Sua contribuição foi registrada!</h2>
        <p className="text-slate-600 text-lg">
          Agradecemos sua participação na construção do PAC 2026. Suas sugestões são fundamentais para o desenvolvimento da nossa universidade.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full max-w-2xl">
        <h4 className="font-bold text-blue-900 mb-4">Próximos Passos (Cronograma)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-left">
          <div>
            <span className="block font-bold text-blue-800">Jan-Fev</span>
            <span className="text-blue-600 block">Diagnóstico</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Março</span>
            <span className="text-blue-600 block">Matriz de Cap.</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Abr-Nov</span>
            <span className="text-blue-600 block">Execução</span>
          </div>
          <div>
            <span className="block font-bold text-blue-800">Dezembro</span>
            <span className="text-blue-600 block">Relatório Final</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onReset}
        className="flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Início
      </button>
    </div>
  );
};