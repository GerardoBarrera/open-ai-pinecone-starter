import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import PineconeUtils from '../../lib/pineconeUtils';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const indexes = await PineconeUtils.get();
  res.status(200).json(indexes);
}