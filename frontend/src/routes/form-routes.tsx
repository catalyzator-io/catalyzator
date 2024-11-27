import { RouteObject } from 'react-router-dom';
import { MultiStepForm } from '../components/form/multi-step-form';
import { FORM_CONFIGS } from '../constants/forms';

const onSubmit = async (data: any) => {
  console.log(data);
};

const onStepChange = (step: number) => {
  console.log(step);
};

const formRoutes: RouteObject[] = Object.values(FORM_CONFIGS).map(({ conf, url }) => ({
  path: url,
  element: (
    <MultiStepForm
      {...conf}
      onSubmit={onSubmit}
      onStepChange={onStepChange}
      className="mx-auto p-4"
    />
  )
}));

export default formRoutes; 