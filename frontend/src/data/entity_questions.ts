import { Question } from '../types/form';

export const entity_questions: Question[] = [
  {
    id: 'entityName',
    question: "What is the name of your company? 💡",
    multiple_entries: false,
    inputSize: 'small',
    type: 'text',
    placeholder: "Company name"
  },
  {
    id: 'entityType',
    question: "Venture or Catalyzor? 💡",
    multiple_entries: false,

    type: 'radio',
    options: [
        { label: 'Venture', value: 'Venture' },
        { label: 'Catalyzator', value: 'Catalyzator' },
      ],
    placeholder: "Venture or Catalyzor?",
    guidelines: "Is your company a venture (Ex: startp) or a Catalyzor (Ex: accelerator, venutre capital, etc)?",
  },
  {
    id: 'entityStory',
    question: "Give us your story. A few sentences about your company? 💡",
    multiple_entries: false,
    inputSize: 'large',
    type: 'text',
    placeholder: "Your story",
    guidelines: "Your story",
  },
  
];

export default entity_questions;