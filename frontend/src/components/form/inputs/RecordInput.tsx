import React, { useState, useRef } from 'react';
import { FormValidationTypeMap } from '../../../types/form';

interface RecordInputProps {
  value?: string;
  onChange: (value: string) => void;
  validation: FormValidationTypeMap['record'];
}

const RecordInput: React.FC<RecordInputProps> = ({
  value,
  onChange,
  validation
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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
        onChange(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-lg ${
          isRecording 
            ? 'bg-red-500 text-white' 
            : 'bg-primary-cool-purple text-white'
        }`}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {value && (
        <audio controls src={value} className="w-full" />
      )}
    </div>
  );
};

export default RecordInput; 