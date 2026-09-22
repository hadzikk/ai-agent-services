import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxOutputTokens: 1000
});

export default model;