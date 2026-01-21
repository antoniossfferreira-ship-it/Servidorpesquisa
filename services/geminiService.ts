import { GoogleGenerativeAI } from "@google/generative-ai";

// O Vite exige o prefixo VITE_ para expor a chave ao navegador
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const generateRefinedSuggestions = async (userInput: string): Promise<string> => {
  if (!apiKey) return "API Key não configurada no Vercel.";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Você é um consultor especialista em T&D. O servidor sugeriu: "${userInput}".
                    Sugira 3 tópicos específicos, práticos e modernos relacionados a esse tema.
                    Retorne APENAS os 3 tópicos em formato de lista (bullet points).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Sem sugestões disponíveis.";
  } catch (error) {
    console.error("Erro Gemini:", error);
    return "Erro ao conectar com o assistente inteligente.";
  }
};

export const analyzeSurveyData = async (responses: any[]): Promise<string> => {
  if (!apiKey) return "Erro: API Key não configurada.";

  const dataContext = responses.map(r => 
    `Cargo: ${r.role}, Área: ${r.department}, Sugestão: ${r.customSuggestions || r.suggestion}`
  ).join('\n');

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Você é um Especialista Sênior em T&D para a UNEB.
                    Com base nestas respostas: ${dataContext}
                    Crie um Plano de Ação Estratégico em MARKDOWN com:
                    1. Agrupamento de Demandas.
                    2. Sugestão de Trilhas (Básico, Intermediário, Avançado).
                    3. Curadoria de Formatos.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error(error);
    return "Erro ao processar análise inteligente.";
  }
};