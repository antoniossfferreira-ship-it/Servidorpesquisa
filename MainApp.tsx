
import React, { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { IntroSection } from './components/IntroSection';
import { SurveyForm } from './components/SurveyForm';
import { SuccessScreen } from './components/SuccessScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginScreen } from './components/LoginScreen';
import { Lock } from 'lucide-react';
import { SurveyResponse } from './types';
import { MOCK_RESPONSES } from './constants';

function MainApp() {
  const [viewState, setViewState] = useState<'intro' | 'survey' | 'success' | 'login' | 'admin'>('intro');
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  // Inicializa dados do localStorage ou usa MOCK_RESPONSES se vazio
  useEffect(() => {
    const saved = localStorage.getItem('uneb_pac_responses');
    if (saved) {
      setResponses(JSON.parse(saved));
    } else {
      // Formata dados mock para o novo tipo se necessário
      const initial = MOCK_RESPONSES.map(r => ({
        id: r.id.toString(),
        date: r.date,
        department: r.department,
        campus: r.campus,
        role: r.role,
        selectedTopics: [],
        customSuggestions: r.suggestion,
        preferredMethodologies: []
      }));
      setResponses(initial);
      localStorage.setItem('uneb_pac_responses', JSON.stringify(initial));
    }
  }, []);

  const handleNewResponse = (newResponse: SurveyResponse) => {
    const responseWithMeta = {
      ...newResponse,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR')
    };
    const updated = [responseWithMeta, ...responses];
    setResponses(updated);
    localStorage.setItem('uneb_pac_responses', JSON.stringify(updated));
    setViewState('success');
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja apagar todas as respostas armazenadas?')) {
      localStorage.removeItem('uneb_pac_responses');
      setResponses([]);
      alert('Base de dados reiniciada.');
    }
  };

  const handleAdminAccess = () => {
    if (viewState === 'admin') return;
    setViewState('login');
  };

  const handleGoHome = () => {
    setViewState('intro');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <AppHeader 
        onAdminClick={handleAdminAccess} 
        onHomeClick={handleGoHome}
        isAdminActive={viewState === 'admin' || viewState === 'login'}
      />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {viewState === 'intro' && (
            <IntroSection onStart={() => setViewState('survey')} />
          )}

          {viewState === 'survey' && (
            <SurveyForm onComplete={handleNewResponse} />
          )}

          {viewState === 'success' && (
            <SuccessScreen onReset={() => setViewState('intro')} />
          )}

          {viewState === 'login' && (
            <LoginScreen 
              onLoginSuccess={() => setViewState('admin')} 
              onCancel={() => setViewState('intro')} 
            />
          )}

          {viewState === 'admin' && (
            <AdminDashboard 
              responses={responses} 
              onExit={() => setViewState('intro')} 
              onClear={handleClearData}
            />
          )}

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Universidade do Estado da Bahia - UNEB. Todos os direitos reservados.</p>
          <p className="mt-2 mb-4">Sistema de Apoio à Gestão de Pessoas - Desenvolvimento Organizacional</p>
          
          {viewState !== 'admin' && viewState !== 'login' && (
             <button 
               onClick={handleAdminAccess}
               className="inline-flex items-center gap-1 text-slate-300 hover:text-slate-500 transition-colors text-xs"
             >
               <Lock className="w-3 h-3" /> Acesso Administrativo
             </button>
          )}
        </div>
      </footer>
    </div>
  );
}

export default MainApp;
