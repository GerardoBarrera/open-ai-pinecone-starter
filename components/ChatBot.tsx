// components/ChatBox.tsx

import React, { useState } from 'react'
import axios from 'axios'

type Props = {}

const ChatBox: React.FC<Props> = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const sendMessage = async () => {
    try {
      const apiResponse = await axios.post('/api/openai', { prompt: message })
      setResponse(apiResponse.data.data)
    } catch (error) {
      setResponse('Error communicating with the API')
    }
  }

  const chatBoxStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
  }

  const buttonStyles: React.CSSProperties = {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1rem',
  }

  const responseStyles: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    minHeight: '100px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
  }

  return (
    <div style={chatBoxStyles}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={inputStyles}
      />
      <button onClick={sendMessage} style={buttonStyles}>
        Send
      </button>
      <div style={responseStyles}>{response}</div>
    </div>
  )
}

export default ChatBox
