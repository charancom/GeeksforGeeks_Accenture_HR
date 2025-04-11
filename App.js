import React, { useState } from 'react';
import ResumeManager from './components/ResumeManager';
import Chat from './components/Chat';
import './App.css';
import MatchingResults from './components/MatchingResults';

function App() {
  const initialMessages = [
    { type: 'bot', content: "Hello! I'm here to help you understand the Game Developer position. What would you like to know about this role?" }
  ];

  const [currentPage, setCurrentPage] = useState('chat');
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setTimeout(() => {
        setJobDescription(e.target.result);
        setMessages([{ 
          type: 'bot', 
          content: "I've analyzed the new job description. What would you like to know about this position?" 
        }]);
        setIsLoading(false);
      }, 2000);
    };

    reader.readAsText(file);
  };

  return (
    <div className="App">
      <header>
        <h1>Resume Helper</h1>
        <nav>
          <button 
            className={`nav-button ${currentPage === 'chat' ? 'active' : ''}`}
            onClick={() => setCurrentPage('chat')}
          >
            Chat
          </button>
          <button 
            className={`nav-button ${currentPage === 'manager' ? 'active' : ''}`}
            onClick={() => setCurrentPage('manager')}
          >
            Resume Manager
          </button>
        </nav>
      </header>

      {currentPage === 'chat' ? (
        <Chat
          messages={messages}
          input={input}
          setInput={setInput}
          setMessages={setMessages}
          isLoading={isLoading}
          handleFileUpload={handleFileUpload}
        />
      ) : (
        <ResumeManager />
      )}
    </div>
  );
}

export default App;