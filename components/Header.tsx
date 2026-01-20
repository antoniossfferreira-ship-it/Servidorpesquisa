import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 p-2 rounded-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">PAC 2026</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">Plano Anual de Capacitação • UNEB</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            Consulta Pública
          </span>
          <span className="text-slate-300">|</span>
          <span>Desenvolvimento de Pessoas</span>
        </div>
      </div>
    </header>
  );
};