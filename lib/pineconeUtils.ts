import { PineconeClient } from "@pinecone-database/pinecone";

export interface PineconeRequest {
  text?: string;
  embedding?: number[];
  id?: string;
  prompt?: string;
}

const pinecone = new PineconeClient();

pinecone.init({
  environment: process.env.PINECONE_ENVIRONMENT,
  apiKey: process.env.PINECONE_API_KEY,
});

pinecone.projectName = process.env.PINECONE_PROJECT_NAME;

const index = pinecone.Index('candidates');

export default class PineconeUtils {
  static async get() {
    const indexes = await pinecone.listIndexes();
    return indexes;
  }
  static async upsert(request: PineconeRequest) {
    const { id, text, embedding, prompt } = request;

    const upsertRequest = {
      vectors: [
        {
          id: id,
          values: embedding,
          metadata: { prompt: prompt, text: text }
        },
      ],
    };

    const upsertResponse = await index.upsert({ upsertRequest });
    return upsertResponse;
  }

  static async update(request: PineconeRequest) {
    const { id, text, embedding } = request;

    const updateRequest = {
      id: id,
      values: embedding,
      setMetadata: { text: text },
    };

    const upsertResponse = await index.update({ updateRequest });
    return upsertResponse;
  }

  static async delete(request: PineconeRequest) {
    const upsertResponse = await index.delete1({ ids: [request.id], deleteAll: false });
    return upsertResponse;
  }

  static async query(request: PineconeRequest) {
    const { embedding } = request;

    const queryRequest = {
      vector: embedding,
      topK: 5,
      includeMetadata: true,
      includeValues: true
    };

    const queryResponse = await index.query({ queryRequest });
    console.log(queryResponse);
    return queryResponse;
  }
}
