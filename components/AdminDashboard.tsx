
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_STATS_AXES, MOCK_STATS_METHODOLOGY, MOCK_STATS_ROLES } from '../constants';
import { 
  ArrowLeft, Download, FileText, PieChart as PieChartIcon, 
  Users, Building, Brain, Sparkles, 
  Loader2, Target, Search, Trash2, X, ClipboardList
} from 'lucide-react';
import { analyzeSurveyData } from '../services/geminiService';
import { SurveyResponse } from '../types';

interface AdminDashboardProps {
  responses: SurveyResponse[];
  onExit: () => void;
  onClear: () => void;
}

const COLORS = ['#1e3a8a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ responses, onExit, onClear }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [campusFilter, setCampusFilter] = useState('');

  const filteredResponses = useMemo(() => {
    return responses.filter(r => {
      const matchesSearch = 
        r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.customSuggestions.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCampus = !campusFilter || r.campus === campusFilter;
      return matchesSearch && matchesCampus;
    });
  }, [responses, searchTerm, campusFilter]);

  const campusOptions = useMemo(() => {
    return Array.from(new Set(responses.map(r => r.campus))).filter(Boolean);
  }, [responses]);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const dataForAI = responses.map(r => ({
        role: r.role,
        department: r.department,
        suggestion: r.customSuggestions
      }));
      const report = await analyzeSurveyData(dataForAI);
      setAiReport(report);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        document.getElementById('ai-report-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleExportCSV = () => {
    const headers = "Data,Campus,Departamento,Cargo,Sugestao\n";
    const rows = filteredResponses.map(r => 
      `${r.date},${r.campus},${r.department},${r.role},"${r.customSuggestions.replace(/"/g, '""')}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pac_uneb_respostas_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
           <div className="flex items-center gap-2 text-blue-800 font-bold text-sm uppercase tracking-widest mb-1">
             <ClipboardList className="w-4 h-4" />
             Área de Desenvolvimento de Pessoas
           </div>
           <h2 className="text-3xl font-bold text-slate-900">
             Gestão Estratégica PAC 2026
           </h2>
           <p className="text-slate-500">Monitoramento e análise das necessidades de capacitação institucional.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleAIAnalysis}
            disabled={isAnalyzing || responses.length === 0}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg hover:shadow-lg transition-all font-bold disabled:opacity-50"
          >
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
            {isAnalyzing ? 'Processando IA...' : 'Gerar Insights IA'}
          </button>
          <button onClick={onExit} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Respostas', value: responses.length, icon: Users, color: 'blue' },
          { label: 'Unidades Ativas', value: campusOptions.length, icon: Building, color: 'emerald' },
          { label: 'Sugestões IA', value: aiReport ? '1' : '0', icon: Sparkles, color: 'purple' },
          { label: 'Filtrados', value: filteredResponses.length, icon: Target, color: 'amber' }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`bg-${kpi.color}-50 p-3 rounded-xl text-${kpi.color}-600`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{kpi.label}</span>
              <span className="text-xl font-bold text-slate-800 block">{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>

      {aiReport && (
        <div id="ai-report-section" className="animate-slide-up scroll-mt-24">
          <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-indigo-100 rounded-3xl shadow-xl overflow-hidden relative">
            <button 
              onClick={() => setAiReport(null)}
              className="absolute top-4 right-4 p-2 text-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-indigo-900 px-8 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Análise Estratégica da IA</h3>
                  <p className="text-xs text-indigo-200 opacity-80">Síntese baseada em dados reais dos servidores.</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="prose prose-slate max-w-none prose-headings:text-indigo-900 prose-strong:text-indigo-700 bg-white p-8 rounded-2xl border border-indigo-50 shadow-inner whitespace-pre-line leading-relaxed">
                {aiReport}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Repositório de Respostas
            </h3>
            <p className="text-sm text-slate-500">Histórico de participações armazenadas localmente.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Pesquisar..."
                 className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             
             <select 
               className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
               value={campusFilter}
               onChange={(e) => setCampusFilter(e.target.value)}
             >
               <option value="">Campi</option>
               {campusOptions.map(c => <option key={c} value={c}>{c}</option>)}
             </select>

             <button 
               onClick={handleExportCSV}
               className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold text-sm shadow-sm"
             >
               <Download className="w-4 h-4" /> Exportar
             </button>

             <button 
               onClick={onClear}
               className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-all font-semibold text-sm"
             >
               <Trash2 className="w-4 h-4" /> Limpar
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-xs tracking-widest">
              <tr>
                <th className="px-8 py-5">Setor</th>
                <th className="px-8 py-5">Campus</th>
                <th className="px-8 py-5">Cargo</th>
                <th className="px-8 py-5">Necessidade Declarada</th>
                <th className="px-8 py-5 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResponses.length > 0 ? (
                filteredResponses.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5 font-semibold text-slate-800">{row.department}</td>
                    <td className="px-8 py-5 text-slate-500">{row.campus}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        row.role === 'Primeiro Emprego' ? 'bg-amber-100 text-amber-700' :
                        row.role === 'Gestor' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {row.role}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-600 max-w-sm">
                      <div className="truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all italic leading-relaxed">
                        "{row.customSuggestions || 'Sem sugestão adicional'}"
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <div className="text-slate-400 font-medium text-xs">
                        {row.date}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                    Nenhum registro encontrado no repositório.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <Users className="h-5 w-5 text-blue-600" />
             Estratificação por Categoria
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_STATS_ROLES}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-emerald-600" />
            Preferências de Formato
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 h-[300px]">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_STATS_METHODOLOGY}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {MOCK_STATS_METHODOLOGY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full sm:w-1/2 space-y-3">
              {MOCK_STATS_METHODOLOGY.map((entry, index) => (
                <div key={index} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3.5 h-3.5 rounded-full shadow-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
