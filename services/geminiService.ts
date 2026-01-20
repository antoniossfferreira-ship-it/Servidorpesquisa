import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRefinedSuggestions = async (userInput: string): Promise<string> => {
  if (!apiKey) return "API Key não configurada.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um consultor especialista em T&D. O servidor sugeriu: "${userInput}".
        Sugira 3 tópicos específicos, práticos e modernos relacionados a esse tema.
        Retorne APENAS os 3 tópicos em formato de lista (bullet points).
      `,
    });
    return response.text || "Sem sugestões disponíveis.";
  } catch (error) {
    return "Erro ao conectar com o assistente inteligente.";
  }
};

export const analyzeSurveyData = async (responses: any[]): Promise<string> => {
  if (!apiKey) return "Erro: API Key não configurada.";

  const dataContext = responses.map(r => 
    `Cargo: ${r.role}, Área: ${r.department}, Sugestão: ${r.suggestion}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Você é um Especialista Sênior em T&D para a UNEB (Universidade do Estado da Bahia).
        Com base nestas respostas de servidores para o PAC 2026:
        
        ${dataContext}

        Crie um Plano de Ação Estratégico formatado em MARKDOWN com as seguintes seções:
        1. **Agrupamento de Demandas**: Identifique as competências (Hard e Soft Skills) mais citadas e agrupe-as.
        2. **Sugestão de Trilhas de Aprendizagem**: Para os 2 maiores grupos identificados, crie uma trilha com 3 níveis:
           - [Básico]: Foco em fundamentos.
           - [Intermediário]: Aplicação prática e ferramentas.
           - [Avançado]: Liderança, estratégia ou automação.
        3. **Curadoria de Conteúdo e Formatos**: Sugira temas modernos e formatos (ex: microlearning, workshops imersivos, mentorias reversas).

        Use uma linguagem profissional, executiva e focada em resultados para a universidade.
      `,
    });

    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error(error);
    return "Erro ao processar análise inteligente.";
  }
};
