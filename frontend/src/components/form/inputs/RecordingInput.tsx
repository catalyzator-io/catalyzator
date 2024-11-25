import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { RecordingInputProps } from './types';
import { FileReference } from '../../../types/common';

const RecordingInput: React.FC<RecordingInputProps> = ({
  value,
  onChange,
  maxDuration,
  minDuration,
  allowedFormats = ['audio/webm', 'audio/mp3', 'audio/wav'],
  placeholder,
  error,
  required
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number>();

  // Update duration while recording
  useEffect(() => {
    if (isRecording && startTimeRef.current) {
      timerRef.current = window.setInterval(() => {
        const currentDuration = (Date.now() - startTimeRef.current) / 1000;
        setDuration(currentDuration);

        if (maxDuration && currentDuration >= maxDuration) {
          stopRecording();
        }
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, maxDuration]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Find supported format
      const supportedFormat = allowedFormats.find(format => 
        MediaRecorder.isTypeSupported(format)
      );

      if (!supportedFormat) {
        throw new Error(`Supported formats: ${allowedFormats.join(', ')}`);
      }

      const recorder = new MediaRecorder(stream, { mimeType: supportedFormat });
      
      chunksRef.current = [];
      startTimeRef.current = Date.now();
      setRecordingError(null);
      
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const recordingDuration = (Date.now() - startTimeRef.current) / 1000;
        
        if (minDuration && recordingDuration < minDuration) {
          setRecordingError(`Recording must be at least ${minDuration} seconds`);
          return;
        }

        const blob = new Blob(chunksRef.current, { type: supportedFormat });
        
        const fileRef: FileReference = {
          url: URL.createObjectURL(blob),
          name: `recording-${new Date().toISOString()}.${supportedFormat.split('/')[1]}`,
          type: supportedFormat,
          size: blob.size,
          uploaded_at: new Date()
        };

        onChange(fileRef);
        setIsRecording(false);
        setDuration(0);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

    } catch (err) {
      console.error('Failed to start recording:', err);
      setRecordingError(err instanceof Error ? err.message : 'Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(timerRef.current);
    }
  };

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const isDisabled = Boolean(maxDuration && duration >= maxDuration);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            "flex items-center gap-2",
            isRecording && "bg-red-500 hover:bg-red-600"
          )}
          disabled={isDisabled}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Recording
            </>
          )}
        </Button>

        {isRecording && (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">
              {duration.toFixed(1)}s
              {maxDuration && ` / ${maxDuration}s`}
            </span>
          </div>
        )}
      </div>

      {value && 'url' in value && (
        <div className="bg-white/50 rounded-lg p-2">
          <audio controls src={value.url} className="w-full" />
        </div>
      )}

      {(error || recordingError) && (
        <p className="text-sm text-red-500">{error || recordingError}</p>
      )}

      {placeholder && !isRecording && !value && (
        <p className="text-sm text-gray-500">{placeholder}</p>
      )}

      {required && !value && (
        <p className="text-xs text-red-500">* Recording is required</p>
      )}
    </div>
  );
};

export default RecordingInput; 