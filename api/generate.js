import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { personagem, tema } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      personagem === "mulher"
        ? `Gere uma fala curta e natural de uma mãe entrevistando seu bebê sobre ${tema}, em português.`
        : `Gere uma fala curta, engraçada e com tom "mock-serious" de um bebê respondendo sobre ${tema}, em português.`;

    const result = await model.generateContent(prompt);
    const texto = result.response.text();

    res.status(200).json({ texto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
