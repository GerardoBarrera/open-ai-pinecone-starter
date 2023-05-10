// components/CreateEmbedding.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface CreateEmbeddingProps {
  onEmbeddingCreated: () => void;
}

const CreateEmbedding: React.FC<CreateEmbeddingProps> = ({ onEmbeddingCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/embed', { prompt: prompt, info: info });
      setPrompt('');
      setInfo('');
      onEmbeddingCreated();
    } catch (error) {
      console.error('Error creating embedding:', error);
    }
  };

  return (
    <div>
      <h2>Create Embedding</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <label htmlFor="info">Info:</label>
        <input
          type="text"
          id="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          required
        />
        <button type="submit">Create Embedding</button>
      </form>
    </div>
  );
};

export default CreateEmbedding;
