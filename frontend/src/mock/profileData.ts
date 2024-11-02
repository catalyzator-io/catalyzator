import { UserProfile, Entity } from '../firebase/profile_api';

export const mockProfileData: { profile: UserProfile; entities: Entity[] } = {
  profile: {
    full_name: "Sarah Chen",
    email: "sarah.chen@example.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    description: "Founder and tech entrepreneur passionate about sustainable innovation and social impact.",
  },
  entities: [
    {
      id: "entity1",
      basicInfo: {
        companyName: "GreenTech Solutions",
        industry: "Clean Energy",
      },
      story: "Founded in 2022, GreenTech Solutions is developing breakthrough solar energy storage technology to make renewable energy more accessible to communities worldwide.",
      team: {
        founders: ["Sarah Chen", "Michael Rodriguez"],
        employeeCount: "5-10",
      },
      products: {
        grants: {
          "grant1": {
            name: "Climate Innovation Fund Application",
            status: "Under Review",
            created_at: "2024-02-15T08:00:00Z",
          },
          "grant2": {
            name: "Sustainable Tech Grant 2024",
            status: "Approved",
            created_at: "2024-01-10T10:30:00Z",
          }
        }
      }
    },
    {
      id: "entity2",
      basicInfo: {
        companyName: "EduAccess",
        industry: "EdTech",
      },
      story: "EduAccess is building an AI-powered platform to provide personalized learning experiences for students in underserved communities.",
      team: {
        founders: ["Sarah Chen"],
        employeeCount: "1-5",
      },
      products: {
        grants: {
          "grant3": {
            name: "Education Innovation Grant",
            status: "Draft",
            created_at: "2024-03-01T15:45:00Z",
          }
        }
      }
    }
  ]
};