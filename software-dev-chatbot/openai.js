const OpenAI = require('openai').default;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function askGPT(prompt, history = []) {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...history,
      { role: 'user', content: prompt }
    ],
    max_tokens: 150
  });
  return chatCompletion.choices[0].message.content.trim();
}

module.exports = { askGPT };
