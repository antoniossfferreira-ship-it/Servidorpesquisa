
export enum SectorType {
  ADMINISTRATIVE = 'Administrativo',
  ACADEMIC = 'Acadêmico',
  MANAGEMENT = 'Gestão',
  EXTERNAL = 'Outro'
}

export enum Methodology {
  PRESENTIAL = 'Cursos presenciais',
  EAD = 'Cursos EAD',
  ASYNCHRONOUS = 'Cursos assíncronos',
  WORKSHOPS = 'Oficinas práticas',
  WEBINARS = 'Webinars quinzenais',
  MANUALS = 'Manuais operacionais'
}

export interface TrainingAxis {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

export interface SurveyResponse {
  id?: string;
  date?: string;
  department: string;
  campus: string;
  role: string;
  selectedTopics: string[];
  customSuggestions: string;
  preferredMethodologies: string[];
}

export interface DashboardStat {
  name: string;
  value: number;
}
