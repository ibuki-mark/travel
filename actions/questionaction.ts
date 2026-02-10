import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

// AnswerItem[] の Zod
const AiAnswerSchema = z.object({
  answer:z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
  question:z.string()
})

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateAiQuestion({
  title,
  content,
  question
}: {
  title: string;
  content: string;
  question:string
}) {
  const prompt = `
あなたは思考型ブログの編集者です。

次の質問に対して「答え(answer)」を3〜5個フレンドリーで的確な答えを作ってください。
出力は AnswerItem の配列(JSON)のみ。

【タイトル】${title}
【本文】${content}
【質問】${question}
  `.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(AiAnswerSchema), // ✅ここ！
    },
  });

  const raw=response.text ?? ""
  const json = JSON.parse(raw);

  return AiAnswerSchema.parse(json); // ✅ 型安全にする
}
