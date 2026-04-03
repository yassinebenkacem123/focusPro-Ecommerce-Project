import React, { useState, useEffect } from "react";

const messages = [
  "How can I assist you today?",
  "Need help navigating?",
  "I'm here if you have questions!",
  "Checking the latest metrics?",
  "Have a great day ahead!"
];

const AdminChatbot: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   // Show a message periodically
  //   const interval = setInterval(() => {
  //     setMessageIndex((prev) => (prev + 1) % messages.length);
  //     setShowMessage(true);
      
  //     // Hide the message after 3 seconds
  //     setTimeout(() => {
  //       setShowMessage(false);
  //     }, 3000);
  //   }, 8000); // 5s hidden + 3s visible = 8s cycle

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative z-50 flex items-center">
      {/* Enhanced Tooltip / Chat bubble */}
      <div 
        className={`absolute top-full mt-4 border border-gray-300/70 dark:border-gray-700/60   -right-2 px-5 py-3.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-2xl rounded-tr-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-200/60 dark:border-gray-700/60 whitespace-nowrap transition-all duration-500 ease-out transform origin-top-right ${
          showMessage ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          {messages[messageIndex]}
        </div>
      </div>

      {/* Button */}
      <button
        title="AI Assistant"
        aria-label="Open AI Assistant"
        className="group relative flex items-center justify-center rounded-full cursor-pointer
          bg-gray-100 dark:bg-gray-800
          hover:bg-gray-200 dark:hover:bg-gray-700
          border border-gray-200/80 dark:border-gray-700/60
          hover:border-orange-300/60 dark:hover:border-orange-500/50
          transition-all duration-300 overflow-visible
          h-9 w-9"
      >
        {/* Subtle hover pulse */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-orange-400 dark:bg-orange-500" style={{ animationDuration: '2s' }} />

        {/* Status dot */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full z-20 transition-colors duration-300"></span>

        {/* Icon Image */}
        <img
          src="/admin-chatbot-icon.png"
          alt="AI Assistant"
          className="w-5 h-5 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 dark:invert"
        />
      </button>
    </div>
  );
};

export default AdminChatbot;