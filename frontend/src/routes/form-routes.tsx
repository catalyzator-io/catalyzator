import { RouteObject } from 'react-router-dom';
import { FormContainer } from '../components/form/FormContainer';

const formRoutes: RouteObject[] = [
  {
    path: "/form/registration",
    element: (
      <FormContainer 
        formId="entity_registration"
        className="mx-auto p-4"
      />
    )
  },
  {
    path: "/form/consent",
    element: (
      <FormContainer 
        formId="user_consent"
        className="mx-auto p-4"
      />
    )
  },
  {
    path: "/form/innovator/introduction",
    element: (
      <FormContainer 
        formId="innovator_introduction"
        className="mx-auto p-4"
      />
    )
  },
  {
    path: "/form/innovator/fundmatch",
    element: (
      <FormContainer 
        formId="fundmatch_innovator"
        className="mx-auto p-4"
      />
    )
  },
  {
    path: "/form/innovator/past-applications",
    element: (
      <FormContainer 
        formId="past_applications"
        className="mx-auto p-4"
      />
    )
  },
  {
    path: "/form/investor/interest",
    element: (
      <FormContainer 
        formId="angel_investor_interest"
        className="mx-auto p-4"
      />
    )
  }
];

export default formRoutes; 