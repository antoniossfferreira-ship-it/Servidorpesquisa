import { TrainingAxis, Methodology } from './types';

export const TRAINING_AXES: TrainingAxis[] = [
  {
    id: 'eixo1',
    title: 'Eixo 1 — Gestão Administrativa e Operacional',
    description: 'Foco em arquivos, fluxos, compras e legislação.',
    topics: [
      'Gestão de arquivos e documentação',
      'Fluxos administrativos padronizados',
      'Compras públicas e nova lei de licitações (Lei 14.133/2021)',
      'Gestão orçamentária básica',
      'Gestão de contratos',
      'Ética e responsabilidade administrativa',
      'LAI (Lei de Acesso à Informação)'
    ]
  },
  {
    id: 'eixo2',
    title: 'Eixo 2 — Gestão Acadêmica',
    description: 'Processos ligados à vida acadêmica e registros.',
    topics: [
      'Matrícula e rematrícula',
      'Registro acadêmico',
      'Currículo, PPCs e resoluções internas',
      'Normas acadêmicas e calendários',
      'Sistemas acadêmicos'
    ]
  },
  {
    id: 'eixo3',
    title: 'Eixo 3 — Tecnologias e Transformação Digital',
    description: 'Modernização e ferramentas digitais.',
    topics: [
      'Excel avançado',
      'Automação administrativa',
      'Sistemas administrativos e de gestão',
      'Segurança da informação',
      'Introdução à programação aplicada à gestão'
    ]
  },
  {
    id: 'eixo4',
    title: 'Eixo 4 — Comunicação e Relacionamento',
    description: 'Melhoria no atendimento e clima organizacional.',
    topics: [
      'Redação oficial e institucional',
      'Comunicação interna efetiva',
      'Atendimento humanizado',
      'Gestão de conflitos',
      'Cultura organizacional'
    ]
  },
  {
    id: 'eixo5',
    title: 'Eixo 5 — Desenvolvimento Humano',
    description: 'Competências comportamentais e liderança.',
    topics: [
      'Trabalho colaborativo',
      'Planejamento e organização',
      'Liderança para chefias',
      'Inteligência emocional e bem-estar laboral'
    ]
  }
];

export const METHODOLOGIES: string[] = [
  Methodology.PRESENTIAL,
  Methodology.EAD,
  Methodology.ASYNCHRONOUS,
  Methodology.WORKSHOPS,
  Methodology.WEBINARS,
  Methodology.MANUALS
];

// Dados para os gráficos do Dashboard
export const MOCK_STATS_AXES = [
  { name: 'Gestão Admin', value: 45 },
  { name: 'Gestão Acadêmica', value: 30 },
  { name: 'Tecnologias', value: 65 },
  { name: 'Comunicação', value: 25 },
  { name: 'Desenv. Humano', value: 35 },
];

export const MOCK_STATS_METHODOLOGY = [
  { name: 'Presencial', value: 40 },
  { name: 'EAD', value: 80 },
  { name: 'Assíncronos', value: 35 },
  { name: 'Oficinas', value: 55 },
];

export const MOCK_STATS_ROLES = [
  { name: 'Técnico Admin', value: 120 },
  { name: 'Analista', value: 85 },
  { name: 'Docente', value: 150 },
  { name: 'Gestor', value: 40 },
  { name: 'Primeiro Emprego', value: 15 },
  { name: 'Outros', value: 25 },
];

// Base de respostas para a Tabela de Estratificação
export const MOCK_RESPONSES = [
  { id: 1, date: '28/11/2024', department: 'Financeiro', campus: 'Campus I', role: 'Técnico Admin', suggestion: 'Necessito de Excel Avançado e Power BI para relatórios' },
  { id: 2, date: '28/11/2024', department: 'Secretaria', campus: 'Campus II', role: 'Primeiro Emprego', suggestion: 'Gostaria de entender melhor os fluxos de processos da UNEB' },
  { id: 3, date: '29/11/2024', department: 'RH', campus: 'Reitoria', role: 'Analista', suggestion: 'Treinamento em Gestão de Conflitos e Inteligência Emocional' },
  { id: 4, date: '29/11/2024', department: 'Informática', campus: 'Campus I', role: 'Gestor', suggestion: 'Workshop sobre a nova Lei de Licitações' },
  { id: 5, date: '30/11/2024', department: 'Biblioteca', campus: 'Campus V', role: 'Outros', suggestion: 'Capacitação em acessibilidade e atendimento ao público' },
];
