
import React from 'react';
import { GraduationCap, BookOpen, Settings } from 'lucide-react';

interface AppHeaderProps {
  onAdminClick: () => void;
  onHomeClick: () => void;
  isAdminActive: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onAdminClick, onHomeClick, isAdminActive }) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onHomeClick}
        >
          <div className="bg-blue-900 p-2 rounded-lg group-hover:bg-blue-800 transition-colors">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">PAC 2026</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Plano Anual de Capacitação • UNEB</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={onHomeClick}
            className={`flex items-center gap-2 transition-colors hover:text-blue-600 ${!isAdminActive ? 'text-blue-700 font-bold' : ''}`}
          >
            <BookOpen className="h-4 w-4" />
            Consulta Pública
          </button>
          <span className="text-slate-300">|</span>
          <button 
            onClick={onAdminClick}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:bg-slate-100 ${isAdminActive ? 'bg-blue-50 text-blue-900 font-bold' : ''}`}
          >
            <Settings className={`h-4 w-4 ${isAdminActive ? 'text-blue-600' : 'text-slate-400'}`} />
            Desenvolvimento de Pessoas
          </button>
        </div>
      </div>
    </header>
  );
};
