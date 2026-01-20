
import React, { useState } from 'react';
import { Lock, User, ArrowLeft, Loader2, AlertCircle } from 'lucide-center';
import { Lock as LockIcon, User as UserIcon, ArrowLeft as ArrowLeftIcon, Loader2 as LoaderIcon, AlertCircle as AlertIcon } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulating API delay
    setTimeout(() => {
      // Novas credenciais: FormsCoped / Coped@26
      if (username === 'FormsCoped' && password === 'Coped@26') {
        onLoginSuccess();
      } else {
        setError('Usuário ou senha incorretos.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LockIcon className="w-8 h-8 text-blue-900" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Acesso Restrito</h2>
          <p className="text-slate-500 text-sm mt-1">Área exclusiva para gestão do PAC</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
              <AlertIcon className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoaderIcon className="w-4 h-4 animate-spin" /> Verificando...
              </>
            ) : (
              'Entrar no Sistema'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};
