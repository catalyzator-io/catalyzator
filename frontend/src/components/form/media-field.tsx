import { useState, useRef } from 'react';
import { Mic, Video, Square } from 'lucide-react';
import { Button } from '../ui/button';
import { QuestionConfig } from '../../types/form';
import { Alert, AlertDescription } from '../ui/alert';

interface MediaFieldProps {
  type: 'audio' | 'video';
  onChange: (file: File) => void;
  value?: File;
  validation?: QuestionConfig['validation']['media'];
}

export function MediaField({ type, onChange, value, validation }: MediaFieldProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [preview, setPreview] = useState<string>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const chunksRef = useRef<Blob[]>([]);
  const [error, setError] = useState<string>();

  const startRecording = async () => {
    setError(undefined);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video',
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      let recordingDuration = 0;
      const durationInterval = validation?.maxDuration && setInterval(() => {
        recordingDuration += 1;
        if (recordingDuration >= validation.maxDuration!) {
          stopRecording();
          clearInterval(durationInterval);
        }
      }, 1000);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: type === 'video' ? 'video/webm' : 'audio/webm',
        });

        if (validation?.maxSize && blob.size > validation.maxSize) {
          setError(`File size exceeds maximum allowed size of ${validation.maxSize / (1024 * 1024)}MB`);
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        const file = new File([blob], `recording.${type === 'video' ? 'webm' : 'ogg'}`, {
          type: blob.type,
        });
        
        if (type === 'video') {
          setPreview(URL.createObjectURL(blob));
        }
        
        onChange(file);
        stream.getTracks().forEach(track => track.stop());
        if (durationInterval) clearInterval(durationInterval);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={isRecording ? "destructive" : "secondary"}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <>
              <Square className="mr-2 h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              {type === 'video' ? (
                <Video className="mr-2 h-4 w-4" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              Start Recording
            </>
          )}
        </Button>
      </div>

      {value && type === 'video' && preview && (
        <div className="mt-4">
          <video
            src={preview}
            controls
            className="max-w-full rounded-lg border bg-muted"
          />
        </div>
      )}

      {value && type === 'audio' && (
        <div className="mt-4">
          <audio
            src={URL.createObjectURL(value)}
            controls
            className="w-full"
          />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}