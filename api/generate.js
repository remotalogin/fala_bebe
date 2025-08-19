// Importa o SDK do Google Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Pega a chave da API das variáveis de ambiente que você configurou na Vercel
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Garante que o método da requisição seja POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Pega os dados enviados pelo frontend
    const { personagem, tema } = req.body;

    // Validação simples dos dados recebidos
    if (!personagem || !tema) {
      return res.status(400).json({ error: 'Os campos "personagem" e "tema" são obrigatórios.' });
    }

    // Seleciona o modelo do Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Cria o prompt para a IA
    const prompt = `Crie uma fala curta e engraçada para o personagem "${personagem}" sobre o tema "${tema}". A fala deve ter no máximo 20 palavras e ser em português do Brasil.`;
    
    // Gera o conteúdo
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Envia a resposta de volta para o frontend em formato JSON
    res.status(200).json({ texto: text.trim() });

  } catch (error) {
    // Se der qualquer erro, loga no console da Vercel e envia uma resposta de erro clara
    console.error("Erro na API do Gemini:", error);
    res.status(500).json({ error: "Ocorreu um erro ao gerar a fala.", details: error.message });
  }
}
