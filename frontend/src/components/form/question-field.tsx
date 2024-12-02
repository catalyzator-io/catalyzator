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
import { ScrollArea } from '../ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MediaField } from './media-field';
import { FileUploadField } from './file-upload-field';
import { QuestionGroup } from './question-group';

interface QuestionFieldProps {
  question: QuestionConfig;
}

export function QuestionField({ question }: QuestionFieldProps) {
  const form = useFormContext();
  const fieldState = form.getFieldState(question.id);
  const hasError = fieldState.invalid && fieldState.isTouched;

  const getInputContainerClassName = (baseClass: string = "") => cn(
    baseClass,
    "bg-white",
    hasError && "border-red-500 ring-red-200 ring-1"
  );

  const getLabelClassName = (baseClass: string = "") => cn(
    baseClass,
    hasError && "text-red-500"
  );

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
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <FormControl>
                  <Input
                    placeholder={question.placeholder}
                    type={question.type === 'phone' ? 'tel' : question.type}
                    {...field}
                    onChange={question.type === 'number' ? (e) => {
                      const num = Number(String(e.target.value));
                      if (String(num) === '') {
                        field.onChange('');
                        return;
                      }
                      if ( (question.validation?.min && num < question.validation.min) ||
                        (question.validation?.max && num > question.validation.max)) {
                        return;
                      }
                      field.onChange(num);
                    } : field.onChange}
                    className={getInputContainerClassName()}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'rich-text':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <FormControl>
                  <Textarea
                    placeholder={question.placeholder}
                    className={getInputContainerClassName("min-h-[100px]")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'date':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => {
              const [open, setOpen] = React.useState(false);

              return (
                <FormItem className="flex flex-col">
                  <div className="space-y-1 leading-none">
                    <FormLabel className={getLabelClassName()}>
                      {question.question}
                      {question.isRequired && <span className="text-destructive">*</span>}
                    </FormLabel>
                    {question.description && (
                      <p className="text-sm text-muted-foreground">
                        {question.description}
                      </p>
                    )}
                  </div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={getInputContainerClassName(
                            cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
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
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                        disabled={(date) =>
                          (question.validation?.future_only && date < new Date()) ||
                          (question.validation?.past_only && date > new Date())
                        }
                        initialFocus
                        className="bg-white rounded-md border shadow-md"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
        );

      case 'file':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <FormControl>
                  <FileUploadField
                    onChange={field.onChange}
                    value={field.value}
                    validation={question.validation?.file}
                    multiple
                    className={getInputContainerClassName()}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <FormControl>
                  <MediaField
                    type={question.type as 'audio' | 'video'}
                    onChange={field.onChange}
                    value={field.value}
                    validation={question.validation?.media}
                    className={getInputContainerClassName()}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'question-group':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired ? 'At least one entry is required' : false,
              validate: (value) => {
                if (!question.isRequired) return true;
                if (!Array.isArray(value)) return 'Invalid value';
                if (question.groupConfig?.minEntries) {
                  return value.length >= question.groupConfig.minEntries || 
                    `At least ${question.groupConfig.minEntries} entries required`;
                }
                return value.length > 0 || 'At least one entry is required';
              }
            }}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <QuestionGroup
                  groupId={question.id}
                  config={question}
                />
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'checkbox':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired ? 'This field is required' : false,
              validate: question.isRequired ? (value) => value === true || 'This field is required' : undefined
            }}
            render={({ field }) => (
              <FormItem className={cn(
                "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
                getInputContainerClassName()
              )}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className={getLabelClassName()}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  {question.description && (
                    <p className="text-sm text-muted-foreground">
                      {question.description}
                    </p>
                  )}
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'single-choice-multi':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={getLabelClassName("flex items-center gap-1")}>
                  {question.question}
                  {question.isRequired && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className={getInputContainerClassName("flex flex-col space-y-1 p-2 rounded-md")}
                  >
                    {question.options?.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <label htmlFor={option.value}>{option.label}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      case 'multi-choice':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired ? 'At least one option must be selected' : false,
              validate: (value) => {
                if (!question.isRequired) return true;
                return Array.isArray(value) && value.length > 0 || 'At least one option must be selected';
              }
            }}
            render={({ field }) => {
              const currentValues = Array.isArray(field.value) ? field.value : [];
              
              return (
                <FormItem>
                  <FormLabel className={getLabelClassName("flex items-center gap-1")}>
                    {question.question}
                    {question.isRequired && <span className="text-destructive">*</span>}
                  </FormLabel>
                  <FormControl>
                    <ScrollArea className={getInputContainerClassName("h-[200px] rounded-md border")}>
                      <div className="p-4 space-y-3">
                        {question.options?.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              checked={currentValues.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...currentValues, option.value]
                                  : currentValues.filter((v: string) => v !== option.value);
                                field.onChange(newValue);
                              }}
                            />
                            <label 
                              htmlFor={option.value}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
        );

      case 'daterange':
        return (
          <FormField
            control={form.control}
            name={question.id}
            rules={{
              required: question.isRequired && 'Required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={getLabelClassName("flex items-center gap-1")}>
                  {question.question}
                  {question.isRequired && <span className="text-destructive">*</span>}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={getInputContainerClassName()}>
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
                        <Button variant="outline" className={getInputContainerClassName()}>
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      'space-y-4 border-2 rounded-lg p-4 bg-gray-50',
      hasError ? 'border-red-200' : 'border-crazy-orange/20',
      question.className
    )}>
      {renderField()}
    </div>
  );
}