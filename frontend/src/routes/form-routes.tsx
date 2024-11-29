import { RouteObject } from 'react-router-dom';
import { MultiStepForm } from '../components/form/multi-step-form';
import { FORM_CONFIGS } from '../constants/forms';

// FIXME: Implement actual form submission
const onSubmit = async (data: any) => {
  console.log(data);
};

const formRoutes: RouteObject[] = Object.values(FORM_CONFIGS).map(({ conf, url }) => ({
  path: url,
  element: (
    <MultiStepForm
      {...conf}
      onSubmit={onSubmit}
      className="mx-auto p-4"
    />
  )
}));

export default formRoutes; 