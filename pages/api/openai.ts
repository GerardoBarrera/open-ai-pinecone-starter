import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import PineconeUtils from '../../lib/pineconeUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const openAIConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_API_ORG,
  });
  const openAI = new OpenAIApi(openAIConfig);

  const body = await req.body;
  const message = body.prompt;

  const embeddedMessage = await openAI.createEmbedding({
    model: 'text-embedding-ada-002',
    input: message
  });


  const contexts = await PineconeUtils.query({
    embedding: embeddedMessage.data.data[0].embedding,
  });

  console.log(contexts.matches[0].metadata);

  const messageWithContext = `
  ${contexts.matches[0].metadata.prompt}
  ${contexts.matches[0].metadata.text}

  
  Based on the above answer the following:

  ${message.replace(/\n/g, ' ')}
  `;

  console.log(messageWithContext);

  const result = await openAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: messageWithContext,
      },
    ],
    max_tokens: 3500,
    temperature: 0,
    stream: false,
  });

  const aiMessage = result.data.choices[0].message!.content.replace(/\n/g, ' ');
  res.status(200).json({data:aiMessage});
}