import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Upload, Mic, MicOff, Plus, Trash } from 'lucide-react';
import type { Question, FormResponse, DynamicEntry } from '../types/form';

interface FormStepProps {
  question: Question;
  onNext: (response: FormResponse) => void;
  onBack: () => void;
  showBack: boolean;
}

const DynamicFormStep: React.FC<FormStepProps> = ({ question, onNext, onBack, showBack }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dynamicEntries, setDynamicEntries] = useState<DynamicEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Initialize first dynamic entry if type is dynamic
    if (question.type === 'dynamic' && dynamicEntries.length === 0) {
      addNewEntry();
    }
  }, [question.type]);

  const validateEntry = (entry: DynamicEntry): boolean => {
    if (!question.fields) return true;
    
    for (const field of question.fields) {
      if (field.required && !entry.values[field.id]) {
        setError(`${field.label} is required`);
        return false;
      }

      if (field.type === 'number' && question.validation) {
        const value = Number(entry.values[field.id]);
        if (question.validation.min && value < question.validation.min) {
          setError(`${field.label} must be at least ${question.validation.min}`);
          return false;
        }
        if (question.validation.max && value > question.validation.max) {
          setError(`${field.label} must not exceed ${question.validation.max}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate dynamic entries
    if (question.type === 'dynamic') {
      const isValid = dynamicEntries.every(validateEntry);
      if (!isValid) return;
    }

    const response: FormResponse = {};
    
    if (question.type === 'dynamic') {
      response.dynamicEntries = dynamicEntries;
    } else {
      if (text) response.text = text;
      if (file) response.file = file;
      if (audioUrl) response.audioUrl = audioUrl;
      if (selectedOptions.length > 0) response.selectedOptions = selectedOptions;
    }
    
    onNext(response);
    resetForm();
  };

  const resetForm = () => {
    setText('');
    setFile(null);
    setAudioUrl(null);
    setSelectedOptions([]);
    setDynamicEntries([]);
    setError(null);
  };

  const addNewEntry = () => {
    if (question.maxEntries && dynamicEntries.length >= question.maxEntries) {
      setError(`Maximum ${question.maxEntries} entries allowed`);
      return;
    }

    const newEntry: DynamicEntry = {
      id: `entry-${Date.now()}`,
      values: {},
    };
    setDynamicEntries([...dynamicEntries, newEntry]);
  };

  const removeEntry = (entryId: string) => {
    setDynamicEntries(dynamicEntries.filter(entry => entry.id !== entryId));
  };

  const updateEntryValue = (entryId: string, fieldId: string, value: string | File) => {
    setDynamicEntries(entries =>
      entries.map(entry =>
        entry.id === entryId
          ? { ...entry, values: { ...entry.values, [fieldId]: value } }
          : entry
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId?: string, entryId?: string) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (fieldId && entryId) {
      updateEntryValue(entryId, fieldId, selectedFile);
    } else {
      setFile(selectedFile);
    }
  };

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
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Error accessing microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const renderDynamicField = (field: Question['fields'][0], entryId: string) => {
    const value = dynamicEntries.find(entry => entry.id === entryId)?.values[field.id] || '';

    switch (field.type) {
      case 'upload':
        return (
          <div className="relative flex-1">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, field.id, entryId)}
              className="hidden"
              id={`file-${field.id}-${entryId}`}
              accept=".pdf,.docx,.jpg,.png,.mp3,.mp4"
            />
            <label
              htmlFor={`file-${field.id}-${entryId}`}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-primary-crazy-orange rounded-lg cursor-pointer hover:border-primary-crazy-orange/70 transition-colors bg-white/50"
            >
              <Upload className="w-4 h-4 text-primary-crazy-orange" />
              {value instanceof File ? value.name : 'Upload File'}
            </label>
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value as string}
            onChange={(e) => updateEntryValue(entryId, field.id, e.target.value)}
            placeholder={field.placeholder || field.label}
            className="w-full p-4 border-2 border-primary-crazy-orange rounded-lg focus:ring-2 focus:ring-primary-crazy-orange/20 outline-none transition-all bg-white/50"
            required={field.required}
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={value as string}
            onChange={(e) => updateEntryValue(entryId, field.id, e.target.value)}
            placeholder={field.placeholder || field.label}
            className="w-full p-4 border-2 border-primary-crazy-orange rounded-lg focus:ring-2 focus:ring-primary-crazy-orange/20 outline-none transition-all bg-white/50"
            required={field.required}
          />
        );
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-2xl w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-4xl font-bold mb-4 text-primary-cool-purple">
        {question.question}
      </h2>
      
      {question.guidelines && (
        <div className="mb-6 text-gray-600 whitespace-pre-line">
          {question.guidelines}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
<form onSubmit={handleSubmit} className="space-y-6">
  {question.type === 'dynamic' ? (
    <div className="space-y-8">
      {dynamicEntries.map((entry, index) => (
        <div key={entry.id} className="p-6 border-2 border-primary-crazy-orange rounded-lg space-y-4">
          <div className="flex justify-between items-center mb-4">
           
            {dynamicEntries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash className="w-5 h-5" />
              </button>
            )}
          </div>
          {question.fields?.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderDynamicField(field, entry.id)}
            </div>
          ))}
        </div>
      ))}
      {question.multiple_entries && (!question.maxEntries || dynamicEntries.length < question.maxEntries) && (
        <button
          type="button"
          onClick={addNewEntry}
          className="w-full p-4 border-2 border-dashed border-primary-crazy-orange rounded-lg text-primary-crazy-orange hover:bg-primary-crazy-orange/10 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Another Entry
        </button>
      )}
    </div>
  ) : (
          <>
            {(question.type === 'text' || question.allowText) && (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={question.placeholder || 'Type your answer...'}
                className="w-full p-4 min-h-[120px] border-2 border-primary-crazy-orange rounded-lg focus:ring-2 focus:ring-primary-crazy-orange/20 outline-none transition-all bg-white/50 resize-y"
                autoFocus
              />
            )}

            <div className="flex gap-4">
              {(question.type === 'upload' || question.allowUpload) && (
                <div className="relative flex-1">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.docx,.jpg,.png,.mp3,.mp4"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-primary-crazy-orange rounded-lg cursor-pointer hover:border-primary-crazy-orange/70 transition-colors bg-white/50"
                  >
                    <Upload className="w-4 h-4 text-primary-crazy-orange" />
                    {file ? file.name : 'Upload File'}
                  </label>
                </div>
              )}

              {(question.type === 'record' || question.allowRecord) && (
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse-slow'
                        : 'bg-primary-crazy-orange text-white hover:bg-primary-crazy-orange/90'
                    }`}
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
                  </button>
                </div>
              )}
            </div>

            {audioUrl && (
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/webm" />
              </audio>
            )}

            {question.options && (
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-primary-crazy-orange hover:border-primary-crazy-orange/70 transition-colors cursor-pointer bg-white/50"
                  >
                    <input
                      type={question.type === 'radio' ? 'radio' : 'checkbox'}
                      name="options"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => {
                        if (question.type === 'radio') {
                          setSelectedOptions([option.value]);
                        } else {
                          setSelectedOptions(prev =>
                            prev.includes(option.value)
                              ? prev.filter(v => v !== option.value)
                              : [...prev, option.value]
                          );
                        }
                      }}
                      className="w-4 h-4 text-primary-crazy-orange"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex gap-4">
          {showBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          )}
          <button
            type="submit"
            className={`${showBack ? 'flex-1' : 'w-full'} bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group`}
          >
            Continue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DynamicFormStep;