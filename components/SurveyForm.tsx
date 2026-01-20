
import React, { useState, useEffect } from 'react';
import { TRAINING_AXES, METHODOLOGIES } from '../constants';
import { SurveyResponse } from '../types';
import { Check, Sparkles, ChevronRight, ChevronLeft, Send, Loader2, AlertCircle } from 'lucide-react';
import { generateRefinedSuggestions } from '../services/geminiService';

interface SurveyFormProps {
  onComplete: (data: SurveyResponse) => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SurveyResponse>({
    department: '',
    campus: '',
    role: '',
    selectedTopics: [],
    customSuggestions: '',
    preferredMethodologies: []
  });

  useEffect(() => {
    setError(null);
  }, [formData]);

  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!formData.campus.trim() || !formData.department.trim() || !formData.role) {
        setError("Por favor, preencha todos os campos de identificação.");
        return false;
      }
    }
    if (currentStep === 2) {
      if (formData.selectedTopics.length === 0) {
        setError("Selecione pelo menos um tópico de interesse.");
        return false;
      }
    }
    if (currentStep === 4) {
      if (formData.preferredMethodologies.length === 0) {
        setError("Selecione pelo menos uma preferência metodológica.");
        return false;
      }
    }
    return true;
  };

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic]
    }));
  };

  const handleMethodologyToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      preferredMethodologies: prev.preferredMethodologies.includes(method)
        ? prev.preferredMethodologies.filter(m => m !== method)
        : [...prev.preferredMethodologies, method]
    }));
  };

  const handleAIAssist = async () => {
    if (!formData.customSuggestions || formData.customSuggestions.length < 5) return;
    setIsGeneratingAI(true);
    const suggestion = await generateRefinedSuggestions(formData.customSuggestions);
    setAiSuggestion(suggestion);
    setIsGeneratingAI(false);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onComplete(formData);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };
  
  const prevStep = () => {
    setError(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-500">Passo {step} de 4</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`h-2 w-12 rounded-full transition-all ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900">Identificação</h3>
            <p className="text-slate-600">Para começarmos, conte-nos um pouco sobre sua atuação na UNEB.</p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Campus / Unidade <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Ex: Campus I, Reitoria..."
                  value={formData.campus}
                  onChange={e => setFormData({...formData, campus: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Área / Setor <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Ex: PROAF, Protocolo..."
                  value={formData.department}
                  onChange={e => setFormData({...formData, department: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Cargo / Função <span className="text-red-500">*</span></label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Técnico Admin">Técnico Administrativo</option>
                  <option value="Analista">Analista Universitário</option>
                  <option value="Gestor">Gestor / Coordenador</option>
                  <option value="Docente">Docente</option>
                  <option value="Terceirizado">Terceirizado</option>
                  <option value="Estagiário">Estagiário</option>
                  <option value="Primeiro Emprego">Primeiro Emprego</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900">Eixos Temáticos de Interesse</h3>
            <p className="text-slate-600">Selecione os tópicos que você considera prioritários para sua capacitação em 2026. <span className="text-red-500 text-sm">(Mínimo 1)</span></p>
            
            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {TRAINING_AXES.map((axis) => (
                <div key={axis.id} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h4 className="text-lg font-bold text-blue-900 mb-1">{axis.title}</h4>
                  <p className="text-sm text-slate-500 mb-4">{axis.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {axis.topics.map((topic) => (
                      <label 
                        key={topic} 
                        className={`
                          flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all
                          ${formData.selectedTopics.includes(topic) 
                            ? 'bg-blue-50 border-blue-500 shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-blue-300'}
                        `}
                      >
                        <div className={`
                          mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                          ${formData.selectedTopics.includes(topic) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}
                        `}>
                          {formData.selectedTopics.includes(topic) && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.selectedTopics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                        />
                        <span className="text-sm text-slate-700 font-medium leading-tight">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900">Sugestões Específicas</h3>
            <p className="text-slate-600">Descreva abaixo sua necessidade de capacitação (Opcional).</p>
            
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 h-40 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Ex: Gostaria de aprender sobre Power BI para criar dashboards de gestão orçamentária..."
                value={formData.customSuggestions}
                onChange={e => setFormData({...formData, customSuggestions: e.target.value})}
              />
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={handleAIAssist}
                  disabled={!formData.customSuggestions || isGeneratingAI}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGeneratingAI ? 'Analisando...' : 'Expandir com IA'}
                </button>
              </div>
            </div>

            {aiSuggestion && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 animate-fade-in">
                <h5 className="flex items-center gap-2 font-bold text-purple-900 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Sugestões da IA para enriquecer seu pedido:
                </h5>
                <div className="prose prose-sm prose-purple text-purple-800 whitespace-pre-line">
                  {aiSuggestion}
                </div>
                <p className="text-xs text-purple-500 mt-4 italic">
                  *Essas sugestões são geradas automaticamente para inspirar o detalhamento do PAC.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900">Preferências Metodológicas</h3>
            <p className="text-slate-600">Como você prefere aprender? Selecione até 3 opções. <span className="text-red-500 text-sm">(Mínimo 1)</span></p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {METHODOLOGIES.map((method) => (
                <button
                  key={method}
                  onClick={() => handleMethodologyToggle(method)}
                  className={`
                    p-4 rounded-xl border text-left transition-all relative overflow-hidden group
                    ${formData.preferredMethodologies.includes(method)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'}
                  `}
                >
                  <span className="font-semibold">{method}</span>
                  {formData.preferredMethodologies.includes(method) && (
                    <div className="absolute top-0 right-0 p-2">
                       <Check className="w-5 h-5 text-blue-200" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mt-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Ao finalizar, seus dados serão computados para a construção dos indicadores do PAC 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="px-8 pb-4 animate-fade-in">
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        </div>
      )}

      <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 flex justify-between">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 hover:bg-slate-200'}`}
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        
        {step < 4 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                Enviar Participação <Send className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
