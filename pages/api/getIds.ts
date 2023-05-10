// pages/api/getIds.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import { readData } from '../../lib/localStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}
