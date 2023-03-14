import fetch from 'isomorphic-unfetch';

const convertToJSCode = async (
  query: string,
  functionSyntax: string,
  apiKey: any,
  jsObject?: string
) => {
  const prompt = `Translate this natural language query: "${query}" using JavaScript with ${functionSyntax} syntax ${
    jsObject && `Use this object as reference: ${jsObject}`
  }, just the code, without explanations or comments`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 2000,
      n: 1,
      model: 'text-davinci-003',
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      logprobs: 10,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error || 'Error translating to SQL.');

  return data.choices[0].text.trim();
};

export default convertToJSCode;
