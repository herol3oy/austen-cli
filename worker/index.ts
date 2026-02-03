/**
 * Cloudflare Worker for DeepSeek character analysis
 * Handles AI analysis requests and returns Mermaid diagram syntax
 */
import { CHARACTER_ANALYSIS_PROMPT } from '../src/utils/prompt';

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // Parse request body
      const { bookTitle, author } = await request.json();

      if (!bookTitle || !author) {
        return new Response(
          JSON.stringify({ error: 'Missing bookTitle or author' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Check for DeepSeek API key
      if (!env.DEEPSEEK_API_KEY) {
        return new Response(
          JSON.stringify({ error: 'DeepSeek API key not configured' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Call DeepSeek API
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
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
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('DeepSeek API error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to analyze characters' }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) {
        return new Response(
          JSON.stringify({ error: 'No response from AI' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Return the Mermaid syntax
      return new Response(
        JSON.stringify({ mermaidSyntax: content }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
} 
