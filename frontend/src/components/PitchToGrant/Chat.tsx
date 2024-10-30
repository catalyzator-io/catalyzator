import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Mic, MicOff, Send, Upload } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
}

// FIXME: This is a temporary chat component for the pitch to grant.
// TODO: Add the correct logic for the chat.
// TODO: Add the correct voice recording logic.
// TODO: Add the correct file upload logic.
// TODO: Remove all mock data.
export function Chat() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm here to help you create your grant application. Would you like to start with a voice message or text?",
      timestamp: "2:30 PM"
    }
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b bg-white/50 backdrop-blur-sm p-4">
        <h2 className="text-lg font-semibold">Tech Innovation Grant Application</h2>
        <p className="text-sm text-muted-foreground">Voice-enabled chat assistant</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white/50 backdrop-blur-sm"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t bg-white/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            className={isRecording ? "bg-red-100 text-red-600" : ""}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Upload className="h-4 w-4" />
          </Button>
          {isRecording && (
            <>
              <div className="flex-1 h-8 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-purple-600 to-orange-500 animate-pulse" />
              </div>
              <span className="text-sm text-red-600 animate-pulse">Recording...</span>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            className="flex-1 bg-white/50"
          />
          <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}