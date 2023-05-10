import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { deleteData, storeId } from '../../lib/localStore';
import PineconeUtils from '../../lib/pineconeUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = await req.body;
    const id = body.id;
    try {
        await deleteData(id);
        const result = await PineconeUtils.delete({ id: id });
        console.log(result);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data' });
    }
}
