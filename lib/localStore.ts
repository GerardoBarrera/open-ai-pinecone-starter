// lib/localStore.ts

import { promises as fs } from 'fs';
import path from 'path';

// ... rest of the code ...


const dataFilePath = path.join(process.cwd(), 'data', 'ids.json');

export async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file does not exist, return an empty object
      return {};
    }
    throw error;
  }
}

export async function writeData(data: object) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function storeId(id: string, data: object) {
  const currentData = await readData();
  currentData[id] = data;
  await writeData(currentData);
}

export async function deleteData(id: string) {
    const currentData = await readData();
    if (currentData[id]) {
      delete currentData[id];
      await writeData(currentData);
    } else {
      throw new Error(`ID ${id} not found`);
    }
  }
