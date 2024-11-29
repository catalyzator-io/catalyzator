# Data Access Layer (DAL)

## Types & Interfaces

```typescript
import { Firestore, DocumentReference, Timestamp } from 'firebase/firestore';
import { LucideIcon } from 'lucide-react';

// Enum Definitions
enum EntityType {
  INNOVATOR = 'innovator',
  CATALYST = 'catalyst'
}

enum ApplicationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

// Base Metadata Interface
interface BaseMetadata {
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by?: string;
  updated_by?: string;
}

// Product Types
type ProductId = 'pitch-to-grant' | 'compass' | 'fundmatch';
type ProductCategory = 'innovator' | 'catalyst' | 'both';
type ProductFeatureId = 'pitch-to-grant' | 'grant-recommendation' | 'match-approved-innovators' | 'find-investors';

interface ProductFeature {
  id: ProductFeatureId;
  product_id: ProductId;
  name: string;
  description: string;
  is_premium: boolean;
  metadata?: Record<string, any>;
}

interface Product extends BaseMetadata {
  id: ProductId;
  title: string;
  description: string;
  category: ProductCategory;
  features?: ProductFeature[];
  is_active?: boolean;
  metadata?: {
    icon?: LucideIcon;
    route?: string;
    external_link?: string;
    required_permissions?: string[];
  };
}

interface ProductAccess {
  is_active: boolean;
  activated_at: Date;
  features_access: {
    [K in ProductFeatureId]?: {
      is_active: boolean;
      activated_at: Date;
    };
  };
}

type ProductAccessMap = {
  [K in ProductId]?: ProductAccess;
};

// Form Interfaces
enum FormType {
  PROFILE_CREATION = 'profile_creation',
  APPLICATION_GENERATION = 'application_generation',
  MATCHING_PREFERENCE = 'matching_preference'
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multi-select' | 'textarea' | 'boolean';
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface Form extends BaseMetadata {
  id: string;
  title: string;
  description: string;
  type: FormType;
  entity_type: EntityType | 'all';
  fields: FormField[];
  version: number;
  is_active: boolean;
}

interface FormSubmission extends BaseMetadata {
  id: string;
  form_id: string;
  entity_id: string;
  data: Record<string, any>;
  status: 'draft' | 'submitted' | 'processed';
}

// User Interfaces
interface UserRole {
  role: string;
  entity_id: string;
}

interface User extends BaseMetadata {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  product_access: ProductAccessMap;
}

// Entity Interfaces
interface BaseEntity extends BaseMetadata {
  id: string;
  name: string;
  type: EntityType;
}

interface InnovatorEntity extends BaseEntity {
  type: EntityType.INNOVATOR;
  industry: string;
  development_stage: string;
  team_composition: string[];
  product_access_requirements: string[];
}

interface CatalystEntity extends BaseEntity {
  type: EntityType.CATALYST;
  investment_thesis: string;
  preferred_industry_sectors: string[];
  investment_range_min: number;
  investment_range_max: number;
  active_grant_portfolios: string[];
}

// Application and Match Interfaces
interface Application extends BaseMetadata {
  id: string;
  applicant_entity_id: string;
  target_entity_id: string;
  status: ApplicationStatus;
  type: 'grant' | 'investment';
  generated_content: string;
  match_probability: number;
}

interface Match extends BaseMetadata {
  id: string;
  innovator_entity_id: string;
  catalyst_entity_id: string;
  match_score: number;
  match_dimensions: Record<string, number>;
  status: MatchStatus;
}

// Data Access Layer Interface
interface CatalyzatorDAL {
  // Product Operations
  getProducts(): Promise<Product[]>;
  getProductById(productId: ProductId): Promise<Product | null>;

  // Form Operations
  createForm(form: Omit<Form, 'id' | 'created_at' | 'updated_at'>): Promise<Form>;
  getFormsByEntityType(entityType: EntityType | 'all'): Promise<Form[]>;
  submitForm(submission: Omit<FormSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<FormSubmission>;
  getFormSubmissionsByEntity(entityId: string): Promise<FormSubmission[]>;

  // User Operations
  createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User>;
  getUserById(userId: string): Promise<User | null>;
  updateUserProductAccess(userId: string, productAccess: Partial<ProductAccessMap>): Promise<void>;

  // Entity Operations
  createInnovatorEntity(entity: Omit<InnovatorEntity, 'id' | 'created_at' | 'updated_at' | 'type'>): Promise<InnovatorEntity>;
  createCatalystEntity(entity: Omit<CatalystEntity, 'id' | 'created_at' | 'updated_at' | 'type'>): Promise<CatalystEntity>;
  getEntityById(entityId: string): Promise<InnovatorEntity | CatalystEntity | null>;

  // Application and Match Operations
  createApplication(application: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<Application>;
  createMatch(match: Omit<Match, 'id' | 'created_at' | 'updated_at'>): Promise<Match>;

  // Complex Query Operations
  findMatchingEntities(entityId: string, type: EntityType): Promise<(InnovatorEntity | CatalystEntity)[]>;
  getAvailableProductFeatures(entityType: EntityType): Promise<ProductFeature[]>;
}

// Stub Implementation
class FirebaseCatalyzatorDAL implements CatalyzatorDAL {
  private firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  // Stub implementations for interface methods
  async getProducts(): Promise<Product[]> {
    throw new Error('Not implemented');
  }

  async createForm(form: Omit<Form, 'id' | 'created_at' | 'updated_at'>): Promise<Form> {
    throw new Error('Not implemented');
  }

  // ... other method stubs
}

export {
  // Types
  User,
  InnovatorEntity,
  CatalystEntity,
  Application,
  Match,
  Product,
  ProductFeature,
  Form,
  FormSubmission,
  
  // Enums
  EntityType,
  ApplicationStatus,
  MatchStatus,
  FormType,
  
  // Interfaces
  CatalyzatorDAL,
  FirebaseCatalyzatorDAL
};
```

### Detailed Firebase Collection Structure

```
/users/{userId}
├── profile: User
├── product_access: ProductAccessMap
└── entities: {
    innovator_entities: [entityId1, entityId2, ...],
    catalyst_entities: [entityId1, entityId2, ...]
}

/entities/{entityId}
├── profile: InnovatorEntity | CatalystEntity
├── members: {
    /{userId}: {
        role: string,
        joined_at: Timestamp
    }
}
├── applications: {
    /{applicationId}: Application
}
├── matches: {
    /{matchId}: Match
}
└── form_submissions: {
    /{formSubmissionId}: FormSubmission
}

/products/{productId}
├── metadata: Product
└── features: {
    /{featureId}: ProductFeature
}

/forms/{formId}
├── metadata: Form
└── fields: {
    /{fieldId}: FormField
}

/form_submissions/{submissionId}
└── details: FormSubmission

/applications/{applicationId}
└── details: Application

/matches/{matchId}
└── details: Match
```

### Detailed Path Structures

1. **Users Collection**: `/users/{userId}`
   - Path: `/users/{userId}`
   - Sub-paths:
     * `/users/{userId}/profile`
     * `/users/{userId}/product_access`
     * `/users/{userId}/entities/innovator_entities`
     * `/users/{userId}/entities/catalyst_entities`

2. **Entities Collection**: `/entities/{entityId}`
   - Path: `/entities/{entityId}`
   - Sub-paths:
     * `/entities/{entityId}/profile`
     * `/entities/{entityId}/members/{userId}`
     * `/entities/{entityId}/applications/{applicationId}`
     * `/entities/{entityId}/matches/{matchId}`
     * `/entities/{entityId}/form_submissions/{submissionId}`

3. **Products Collection**: `/products/{productId}`
   - Path: `/products/{productId}`
   - Sub-paths:
     * `/products/{productId}/metadata`
     * `/products/{productId}/features/{featureId}`

4. **Forms Collection**: `/forms/{formId}`
   - Path: `/forms/{formId}`
   - Sub-paths:
     * `/forms/{formId}/metadata`
     * `/forms/{formId}/fields/{fieldId}`

5. **Form Submissions Collection**: `/form_submissions/{submissionId}`
   - Path: `/form_submissions/{submissionId}`

6. **Applications Collection**: `/applications/{applicationId}`
   - Path: `/applications/{applicationId}`

7. **Matches Collection**: `/matches/{matchId}`
   - Path: `/matches/{matchId}`

### Query and Relationship Patterns

1. **User-Entity Relationships**
   - A user can be associated with multiple entities
   - Entity memberships tracked in both user and entity collections
   - Example query: Find all entities a user belongs to

2. **Product Access Management**
   - Product access stored at user level
   - Allows granular feature-level access control
   - Can query available features based on user's entity type

3. **Form and Submission Tracking**
   - Forms templates stored separately from submissions
   - Submissions linked to specific entities
   - Supports tracking of form completions across different entity types

4. **Application and Match Tracking**
   - Applications and matches linked to specific entities
   - Supports bidirectional querying (by innovator or catalyst)

### Example Complex Query Patterns

1. Find all applications for a specific innovator entity:
   ```typescript
   const applications = await firestore
     .collection('entities')
     .doc(entityId)
     .collection('applications')
     .where('type', '==', 'grant')
     .get();
   ```

2. Get all form submissions for a user's entities:
   ```typescript
   const userEntities = user.entities.innovator_entities;
   const submissions = await Promise.all(
     userEntities.map(entityId => 
       firestore
         .collection('entities')
         .doc(entityId)
         .collection('form_submissions')
         .get()
     )
   );
   ```

3. Check product feature access:
   ```typescript
   const userProductAccess = user.product_access['pitch-to-grant'];
   const canAccessFeature = userProductAccess?.features_access['pitch-to-grant']?.is_active;
   ```

This structure provides:
- Flexible entity relationships
- Granular access control
- Easy querying across different collections
- Clear separation of concerns
- Support for complex matching and recommendation systems

---

# Comprehensive Data Access Layer (DAL) Implementation Guide for Catalyzator Platform

## Project Overview
Implement a robust, type-safe Firebase-based Data Access Layer (DAL) for the Catalyzator platform, focusing on creating a flexible, scalable backend infrastructure that supports complex startup-investor ecosystem interactions.

## Technical Requirements
- Language: TypeScript
- Database: Firebase Firestore
- Architecture: Modular, type-safe, with comprehensive interfaces

## Detailed Implementation Roadmap

### Phase 1: Project Setup and Core Configuration
1. Initialize TypeScript project
  - Configure `tsconfig.json` for strict typing
  - Set up Firebase configuration
  - Install necessary dependencies
2. Create base type definitions
  - Implement `BaseMetadata` interface
  - Define all enums (EntityType, ApplicationStatus, etc.)
  - Establish core interfaces for User, Entity, Product

### Phase 2: Firebase DAL Core Implementation
#### 2.1 Base DAL Abstract Class
- Create an abstract `BaseCatalyzatorDAL` class
- Implement common error handling
- Define standard CRUD method signatures
- Establish logging and performance tracking mechanisms

#### 2.2 User Management Subsystem
- Implement user creation with role and product access management
- Develop complex user query methods
- Create user-entity relationship management functions
- Implement secure user data updates

#### 2.3 Entity Management Subsystem
- Develop methods for creating Innovator and Catalyst entities
- Implement entity membership management
- Create complex entity querying capabilities
- Support dynamic entity type handling

### Phase 3: Product and Feature Access Management
- Implement product and feature retrieval methods
- Develop granular access control logic
- Create methods to validate and manage product feature access
- Implement feature availability checking based on entity type

### Phase 4: Form and Submission System
- Design form template creation methods
- Implement form submission tracking
- Create validation logic for form submissions
- Develop methods to retrieve and process form data

### Phase 5: Application and Matching System
- Implement application creation and tracking
- Develop matching algorithm interface
- Create methods for match generation and status management
- Implement complex matching query capabilities

### Phase 6: Advanced Query and Recommendation Features
- Design methods for intelligent entity matching
- Implement recommendation system query interfaces
- Create advanced filtering and search capabilities
- Develop performance-optimized querying techniques

## Testing Strategy
1. Unit Testing
  - 100% coverage for all DAL methods
  - Mock Firebase interactions
  - Test edge cases and error scenarios

2. Integration Testing
  - Verify Firebase read/write operations
  - Test complex query scenarios
  - Validate access control mechanisms

3. Performance Testing
  - Benchmark query performance
  - Analyze database read/write efficiency
  - Profile memory and computational complexity

## Deliverables
- Complete TypeScript DAL implementation
- Comprehensive type definitions
- Detailed documentation
- Unit and integration test suite
- Performance analysis report

## Constraints and Considerations
- Minimize nested queries
- Implement efficient data denormalization
- Ensure type safety across all operations
- Design for horizontal scalability
- Implement robust error handling

## Out of Scope
- Frontend implementation
- Caching mechanisms
- Advanced machine learning matching algorithms
- Complete authentication system

## Estimated Effort
- Estimated Development Time: 4-6 weeks
- Recommended Team: 
 * 1 Senior Backend Developer
 * 1 TypeScript Specialist
 * 1 Firebase/Cloud Architect

## Acceptance Criteria
- Fully typed, type-safe implementation
- 90%+ test coverage
- Performance within Firebase best practices
- Flexible, extensible architecture
- Comprehensive documentation

## Reporting and Communication
- Weekly progress reports
- Daily stand-up meetings
- Detailed documentation of design decisions
- Code reviews and pair programming sessions

## Next Steps
1. Kickoff meeting
2. Detailed architecture design review
3. Iterative implementation with regular checkpoints
4. Continuous integration and testing