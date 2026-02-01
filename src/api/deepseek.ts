import OpenAI from 'openai';
import { CHARACTER_ANALYSIS_PROMPT } from '../utils/prompt.js';

export async function analyzeCharacters(
  bookTitle: string,
  author: string,
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    throw new Error('DeepSeek API key is required. Set DEEPSEEK_API_KEY in your .env file');
  }

  try {
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: CHARACTER_ANALYSIS_PROMPT,
        },
        {
          role: 'user',
          content: `Book: ${bookTitle}, Author: ${author}`,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('No response from DeepSeek API');
    }

    return content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        throw new Error('Invalid DeepSeek API key. Please check your .env file');
      }
      throw new Error(`DeepSeek API error: ${error.message}`);
    }
    throw new Error(`Failed to analyze characters: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
