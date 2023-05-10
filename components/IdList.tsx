// components/IdList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateEmbedding from './CreateEmbedding';

const IdList: React.FC = () => {
  const [ids, setIds] = useState<{ [key: string]: { text: string; prompt:string; } }>({});

  const deleteEmbedding = async (id: string) => {
    try {
        await axios.post('/api/deleteEmbed', { id: id });
        refresh();
    } catch (error) {
        console.error('Error deleting embedding:', error);
    }
    };
  const refresh = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getIds');
        setIds(response.data);
      } catch (error) {
        console.error('Error fetching IDs:', error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    refresh();
  }, []);

  const tableStyles: React.CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: '1rem',
  };

  const thStyles: React.CSSProperties = {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '0.5rem',
    textAlign: 'left',
    border: '1px solid #ccc',
  };

  const tdStyles: React.CSSProperties = {
    padding: '0.5rem',
    textAlign: 'left',
    border: '1px solid #ccc',
  };

  return (
    <div>
    <CreateEmbedding onEmbeddingCreated={refresh} />
      <h2>Saved IDs and Data</h2>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Prompt</th>
            <th style={thStyles}>Text</th>
            <th style={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ids).map(([id, data]) => (
            <tr key={id}>
              <td style={tdStyles}>{id}</td>
              <td style={tdStyles}>{data.prompt}</td>
              <td style={tdStyles}>{data.text}</td>
              <td style={tdStyles}>
                <button onClick={() => deleteEmbedding(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdList;
