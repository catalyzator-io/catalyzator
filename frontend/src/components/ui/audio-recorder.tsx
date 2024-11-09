import * as React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './button';
import { Mic, MicOff, Trash, Send } from 'lucide-react';

interface AudioRecorderProps extends React.HTMLAttributes<HTMLDivElement> {
  onRecordingComplete?: (blob: Blob) => void;
  onSend?: (audioUrl: string) => void;
  onDelete?: () => void;
  onRecordingStart?: () => void;
  onRecordingEnd?: () => void;
  isRecording?: boolean;
}

export const AudioRecorder = React.forwardRef<HTMLDivElement, AudioRecorderProps>(
  ({ className, onRecordingComplete, onSend, onDelete, onRecordingStart, onRecordingEnd, isRecording: externalIsRecording, ...props }, ref) => {
    const [internalIsRecording, setInternalIsRecording] = React.useState(false);
    const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const chunksRef = React.useRef<Blob[]>([]);

    React.useEffect(() => {
      if (externalIsRecording && !internalIsRecording && !audioUrl) {
        startRecording();
      }
    }, [externalIsRecording]);

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          onRecordingComplete?.(audioBlob);
          stream.getTracks().forEach(track => track.stop());
          onRecordingEnd?.();
        };

        mediaRecorder.start();
        setInternalIsRecording(true);
        onRecordingStart?.();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && internalIsRecording) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        setInternalIsRecording(false);
      }
    };

    const handleDelete = () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
        onDelete?.();
      }
    };

    const handleSend = () => {
      if (audioUrl) {
        onSend?.(audioUrl);
        setAudioUrl(null); // Reset after sending
      }
    };

    React.useEffect(() => {
      return () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      };
    }, []);

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        {!audioUrl ? (
          <>
            <Button
              type="button"
              variant={internalIsRecording ? 'destructive' : 'secondary'}
              size="icon"
              onClick={internalIsRecording ? stopRecording : startRecording}
            >
              {internalIsRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            
            {internalIsRecording && (
              <div className="flex-1 h-8 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-red-500 animate-pulse" />
              </div>
            )}
          </>
        ) : (
          <>
            <audio controls className="flex-1">
              <source src={audioUrl} type="audio/webm" />
            </audio>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="default"
              size="icon"
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-600 to-orange-500"
            >
              <Send className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    );
  }
);

AudioRecorder.displayName = 'AudioRecorder';