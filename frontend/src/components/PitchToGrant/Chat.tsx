import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send, Upload, Mic } from "lucide-react";
import { AudioRecorder } from "../ui/audio-recorder";
import { FileUploader } from "../ui/file-uploader";

interface Message {
  id: number;
  type: "user" | "assistant" | "status_update";
  content: string;
  timestamp: string;
  audioUrl?: string;
  files?: File[];
  statusUpdate?: {
    type: "status_change" | "step_complete";
    newStatus?: string;
    completedStep?: string;
  };
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm here to help you create your grant application. Would you like to start with a voice message or text?",
      timestamp: "2:30 PM"
    },
    {
      id: 2,
      type: "status_update",
      content: "Application status changed to In Progress",
      timestamp: "2:30 PM",
      statusUpdate: {
        type: "status_change",
        newStatus: "in_progress"
      }
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);

  const handleRecordingComplete = (blob: Blob) => {
    console.log('Recording completed:', blob);
  };

  const handleSendAudio = (audioUrl: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: "Voice message",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioUrl
    };
    setMessages([...messages, newMessage]);
    setIsRecording(false);
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleFilesAdded = (files: File[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: `Attached ${files.length} file${files.length === 1 ? '' : 's'}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      files
    };
    setMessages([...messages, newMessage]);
    setShowFileUploader(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b-2 border-b-purple-400 rounded-b-lg p-4 text-gray-100 bg-gradient-to-r from-pale-pink to-purple-500">
        {/* FIXME: Add application name by the choice made by the user in the side bar */}
        <h2 className="text-lg font-semibold">Tech Innovation Grant Application</h2>
        <p className="text-sm text-muted-foreground">Voice-enabled chat assistant</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "status_update" 
                  ? "justify-center" 
                  : message.type === "user" 
                    ? "justify-end" 
                    : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === "status_update"
                    ? "bg-gray-100 text-sm text-gray-600"
                    : message.type === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-orange-100 border"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.audioUrl && (
                  <div className="mt-3 bg-black/10 rounded-lg p-2 min-w-[240px]">
                    <audio controls className="w-full">
                      <source src={message.audioUrl} type="audio/webm" />
                    </audio>
                  </div>
                )}
                {message.files && (
                  <div className="mt-3">
                    {message.files.map((file, index) => (
                      <div
                        key={index}
                        className="bg-black/10 rounded-lg p-2 mb-2 text-xs flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{file.name}</span>
                        <span className="text-xs opacity-70">
                          ({Math.round(file.size / 1024)}KB)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs mt-2 block opacity-70">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t bg-white p-4">
        {showFileUploader ? (
          <div className="mb-4">
            <FileUploader
              variant="compact"
              maxFiles={3}
              onFilesAdded={handleFilesAdded}
              accept={{
                'image/*': [],
                'application/pdf': [],
                '.doc,.docx': [],
              }}
            />
          </div>
        ) : null}
        <div className="flex gap-2">
          {isRecording ? (
            <AudioRecorder 
              className="flex-1"
              onRecordingComplete={handleRecordingComplete}
              onSend={handleSendAudio}
              onDelete={() => setIsRecording(false)}
              isRecording={isRecording}
              onRecordingStart={() => {}}
              onRecordingEnd={() => {}}
            />
          ) : (
            <>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsRecording(true)}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFileUploader(!showFileUploader)}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button 
                className="bg-gradient-to-r from-purple-600 to-orange-500"
                onClick={handleSendText}
              >
                <Send className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}