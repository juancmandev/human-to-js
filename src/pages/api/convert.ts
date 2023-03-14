import { NextApiRequest, NextApiResponse } from 'next';
import convertToJSCode from '@/services/convertToJSCode.service';

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'OPENAI_API_KEY is not defined in .env file. Please add it there (see README.md for more details).'
  );
}

export default async function convert(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, functionSyntax, jsObject } = await JSON.parse(req.body);

  try {
    const outputText = await convertToJSCode(
      query,
      functionSyntax,
      process.env.OPENAI_API_KEY,
      jsObject && jsObject
    );

    res.status(200).json({ outputText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error translating to natural language' });
  }
}
