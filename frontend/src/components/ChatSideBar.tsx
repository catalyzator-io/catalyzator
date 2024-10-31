import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  activeChat: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatSideBar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
              activeChat === chat.id
                ? 'bg-gradient-to-r from-orange-100 to-purple-100'
                : 'hover:bg-gray-100'
            }`}
          >
            <MessageSquare
              className={`w-5 h-5 ${
                activeChat === chat.id ? 'text-orange-500' : 'text-gray-500'
              }`}
            />
            <div className="flex-1 text-left truncate">
              <span
                className={`${
                  activeChat === chat.id ? 'text-gray-900' : 'text-gray-700'
                }`}
              >
                {chat.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;