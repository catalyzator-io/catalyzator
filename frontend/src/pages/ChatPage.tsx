import React, { useState, useEffect } from 'react';
import { MessageSquare, History, Send, User2 } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatSideBar from '../components/ChatSideBar';
import { Message, Chat } from '../types';

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<'user1' | 'user2'>('user1');
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string>('default');

  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      const defaultChat: Chat = {
        id: 'default',
        label: 'New Chat',
        messages: [],
        timestamp: new Date().toISOString(),
      };
      setChats([defaultChat]);
    }
  }, []);

  useEffect(() => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat) {
      setMessages(currentChat.messages);
    }
  }, [activeChat, chats]);

  const saveMessage = (newMessage: Message) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          label: chat.messages.length === 0 ? `Chat ${chat.messages.length + 1}` : chat.label,
        };
      }
      return chat;
    });
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: currentUser,
      timestamp: new Date().toISOString(),
    };

    saveMessage(newMessage);
    setInputMessage('');
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      label: `Chat ${chats.length + 1}`,
      messages: [],
      timestamp: new Date().toISOString(),
    };
    setChats([...chats, newChat]);
    setActiveChat(newChat.id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 ease-in-out bg-white border-r border-gray-200`}
      >
        <ChatSideBar
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onNewChat={createNewChat}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <History className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentUser(currentUser === 'user1' ? 'user2' : 'user1')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                currentUser === 'user1'
                  ? 'bg-orange-500 text-white'
                  : 'bg-purple-500 text-white'
              }`}
            >
              <User2 className="w-4 h-4" />
              <span>{currentUser === 'user1' ? 'User 1' : 'User 2'}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} currentUser={currentUser} />
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;