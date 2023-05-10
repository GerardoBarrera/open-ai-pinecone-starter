import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { deleteData, storeId } from '../../lib/localStore';
import PineconeUtils from '../../lib/pineconeUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.method);
    console.log(await req.body);
    if (req.method === 'POST') {
        const openAIConfig = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_API_ORG,
        });
        const openAI = new OpenAIApi(openAIConfig);

        const body = await req.body;
        const message = body.prompt;
        const information = body.info;

        const result = await openAI.createEmbedding({
            model: 'text-embedding-ada-002',
            input: message
        });

        const embedding = result.data.data[0].embedding;

        const randomId = uuidv4(); // Generate a random ID using uuid
        await PineconeUtils.upsert({ id: randomId, text: information, embedding: embedding, prompt: message});
        await storeId(randomId, { text: information, prompt: message});
        res.status(200).json(embedding);
    }
    if (req.method === 'DELETE') {
        console.log(req.body);
        // console.log(`Deleting data ${}`);
        // try {
        //     await deleteData(id);
        //     await PineconeUtils.delete({ id: id });
        //     res.status(200).json({ message: 'Deleted successfully' });
        // } catch (error) {
        //     res.status(500).json({ message: 'Error deleting data' });
        // }
      } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).json({ message: `Method ${req.method} not allowed` });
      }
}
