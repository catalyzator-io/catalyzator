import { EntityQuestion } from '../types/form';

export const entity_questions: EntityQuestion[] = [
  {
    id: 'entityName',
    question: "What is the name of your company? 💡",
    multiple_entries: false,

    type: 'text',
    placeholder: "Company name",
    guidelines: "Company Name",
  },
  {
    id: 'entityType',
    question: "Venture or Catalyzor? 💡",
    multiple_entries: false,

    type: 'text',
    placeholder: "Venture or Catalyzor?",
    guidelines: "Venture or Catalyzor?",
  },
  {
    id: 'entityStory',
    question: "Give us your story. A few sentences about your company? 💡",
    multiple_entries: false,

    type: 'text',
    placeholder: "Your story",
    guidelines: "Your story",
  },
  
];

export default entity_questions;