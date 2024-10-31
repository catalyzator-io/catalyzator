import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  currentUser: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isCurrentUser = message.sender === currentUser;

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isCurrentUser
            ? 'bg-orange-500 text-white rounded-br-none'
            : 'bg-purple-500 text-white rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;