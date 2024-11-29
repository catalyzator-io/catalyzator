import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { QuestionConfig } from '../../types/form';
import { cn } from '../../utils/cn';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MediaField } from './media-field';
import { FileUploadField } from './file-upload-field';
import { QuestionGroup } from './question-group';
import { ScrollArea } from '../ui/scroll-area';

interface QuestionFieldProps {
  question: QuestionConfig;
}

export function QuestionField({ question }: QuestionFieldProps) {
  const form = useFormContext();

  const renderField = () => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'phone':
      case 'number':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={question.placeholder}
                    type={question.type === 'phone' ? 'tel' : question.type}
                    {...field}
                    onChange={question.type === 'number' ? (e) => {
                      const num = Number(String(e.target.value));
                      if (isNaN(num) || (question.validation?.min && num < question.validation.min) ||
                        (question.validation?.max && num > question.validation.max)) {
                        return;
                      }
                      field.onChange(num);
                    } : field.onChange}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'rich-text':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={question.placeholder}
                    className="min-h-[100px] bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'date':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal bg-white',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        (question.validation?.future_only && date < new Date()) ||
                        (question.validation?.past_only && date > new Date())
                      }
                      showOutsideDays={false}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'file':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <FileUploadField
                    onChange={field.onChange}
                    value={field.value}
                    validation={question.validation?.file}
                    multiple
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'audio':
      case 'video':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && (
                    <span className="text-destructive">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  <MediaField
                    type={question.type as 'audio' | 'video'}
                    onChange={field.onChange}
                    value={field.value}
                    validation={question.validation?.media}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'question-group':
        return (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {question.question}
              {question.isRequired && (
                <span className="text-destructive">*</span>
              )}
            </FormLabel>
            <QuestionGroup
              groupId={question.id}
              config={question}
            />
            <FormMessage />
          </FormItem>
        );

      case 'checkbox':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
        );

      case 'single-choice-multi':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <ScrollArea className="max-h-[200px]">
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1 bg-white p-2 rounded-md"
                    >
                      {question.options?.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => field.onChange(option.value)}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <label
                            htmlFor={option.value}
                            className="flex-grow cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </ScrollArea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'multi-choice':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <ScrollArea className="max-h-[200px]">
                    <div className="flex flex-col space-y-1 bg-white p-2 rounded-md">
                      {question.options?.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => {
                            const checked = !field.value?.includes(option.value);
                            const newValue = checked
                              ? [...(field.value || []), option.value]
                              : (field.value || []).filter((v: string) => v !== option.value);
                            field.onChange(newValue);
                          }}
                        >
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                          />
                          <label
                            htmlFor={option.value}
                            className="flex-grow cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'daterange':
        return (
          <FormField
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  {question.question}
                  {question.isRequired && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="bg-white">
                          {field.value?.from ? format(field.value.from, 'PPP') : 'From'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <CalendarComponent
                          mode="single"
                          selected={field.value?.from}
                          onSelect={(date) => field.onChange({ ...field.value, from: date })}
                          showOutsideDays={false}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="bg-white">
                          {field.value?.to ? format(field.value.to, 'PPP') : 'To'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <CalendarComponent
                          mode="single"
                          selected={field.value?.to}
                          onSelect={(date) => field.onChange({ ...field.value, to: date })}
                          showOutsideDays={false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('space-y-4 border-crazy-orange/20 border-2 rounded-lg p-4 bg-gray-50', question.className)}>
      {renderField()}
    </div>
  );
}