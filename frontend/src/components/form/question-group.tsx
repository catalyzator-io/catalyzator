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
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: groupId,
    rules: {
      validate: (value) => {
        // Validate minimum entries if specified
        if (config.groupConfig?.minEntries && value.length < config.groupConfig.minEntries) {
          return false;
        }

        // Validate required fields within each group entry
        if (config.groupConfig?.questions) {
          for (const entry of value) {
            for (const question of config.groupConfig.questions) {
              if (question.isRequired && !entry?.[question.id]) {
                return false;
              }
            }
          }
        }

        return true;
      }
    }
  });

  const canAddMore = !config.groupConfig?.maxEntries || 
    fields.length < config.groupConfig.maxEntries;

  const canRemove = !config.groupConfig?.minEntries || 
    fields.length > config.groupConfig.minEntries;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Collapsible key={field.id} defaultOpen={index === 0}>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4 bg-purple-100">
            <CollapsibleTrigger className="flex flex-1 items-center justify-between">
              <h4 className="text-sm font-medium">
                {config.question} #{index + 1}
              </h4>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            {canRemove && fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  config.groupConfig?.questions.forEach(question => {
                    if (question.isRequired) {
                      register(`${groupId}.${index}.${question.id}`, { 
                        required: true 
                      });
                    }
                  });
                  remove(index);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CollapsibleContent className="space-y-4 px-4 pb-4 pt-2 bg-gray-50 rounded-b-lg border-x border-b">
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
          onClick={() => {
            append({});
            config.groupConfig?.questions.forEach(question => {
              if (question.isRequired) {
                register(`${groupId}.0.${question.id}`, { 
                  required: true 
                });
              }
            });
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {config.question}
        </Button>
      )}
    </div>
  );
}