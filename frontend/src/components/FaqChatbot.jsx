import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const faqData = {
  "how do i request support": "Submit the support form.",
  "how do i volunteer": "Complete volunteer registration.",
  "is support free": "Depends on NGO resources.",
  "how long is response time": "Usually 24-48 hours.",
  "can volunteers work remotely": "Depending on NGO requirements.",
};

const FaqChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: 'bot' }]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');

    // Simple keyword matching
    const lowerInput = userMsg.toLowerCase().replace('?', '');
    let botResponse = "Our team will contact you shortly.";
    
    for (const [question, answer] of Object.entries(faqData)) {
      if (lowerInput.includes(question) || question.includes(lowerInput)) {
        botResponse = answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-blue text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-transform hover:scale-110 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col z-50">
          <div className="bg-brand-blue p-4 text-white font-semibold flex justify-between items-center">
            <span>AI FAQ Assistant</span>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto flex flex-col space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-brand-blue text-white self-end rounded-br-sm' : 'bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-100 dark:border-gray-600 self-start rounded-bl-sm'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..." 
              className="flex-1 px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:border-brand-blue"
            />
            <button type="submit" className="bg-brand-blue text-white p-2 rounded-lg hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FaqChatbot;
