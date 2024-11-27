import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { QuestionConfig } from '../../types/form';
import { QuestionField } from './question-field';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface QuestionGroupProps {
  groupId: string;
  config: QuestionConfig;
}

export function QuestionGroup({ groupId, config }: QuestionGroupProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: groupId,
  });

  const canAddMore = !config.groupConfig?.maxEntries || 
    fields.length < config.groupConfig.maxEntries;

  const canRemove = !config.groupConfig?.minEntries || 
    fields.length > config.groupConfig.minEntries;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Collapsible key={field.id}>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <CollapsibleTrigger className="flex flex-1 items-center justify-between">
              <h4 className="text-sm font-medium">
                {config.question} #{index + 1}
              </h4>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            {canRemove && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CollapsibleContent className="space-y-4 px-4 pb-4 pt-2">
            {config.groupConfig?.questions.map((question) => (
              <QuestionField
                key={question.id}
                question={{
                  ...question,
                  id: `${groupId}.${index}.${question.id}`,
                }}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}

      {canAddMore && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append({})}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another {config.question}
        </Button>
      )}
    </div>
  );
}