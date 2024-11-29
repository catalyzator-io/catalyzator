# User-Entity Relationship Analysis

## Core Entities

### 1. User Types
```typescript
@types/user.ts
- Primary User: Represents an individual account holder
- Can be associated with multiple entities
- Has a UserProfile containing personal information
- Contains UserSettings for preferences
- Tracks ProductAccess for feature availability
```

### 2. Entity Types
```typescript
@types/entity.ts
Two distinct entity types:
1. InnovatorEntity (Startup/Company)
   - Represents grant-seeking organizations
   - Has industry classifications
   - Tracks founding date and team size
   - Manages product access and applications

2. CatalystEntity (Grant Provider/Investor)
   - Represents funding organizations
   - Manages investment thesis
   - Defines investment ranges
   - Tracks active grants
   - Specifies preferred industries
```

## Relationship Flow

### User → Entity Association
1. **Creation Flow**
   - User signs up (AuthPage.tsx)
   - Completes onboarding
   - Creates or joins an entity
   - Can be associated with multiple entities as team member

2. **Access Control**
   ```typescript
   Entity {
     members: string[]; // Array of User IDs
     // Determines who has access to the entity
   }
   ```

3. **Role-based Interactions**
   - Users can belong to both Innovator and Catalyst entities
   - Different UI/UX flows based on entity type
   - Access to different product features based on entity type

## Product Access & Features

### 1. Innovator Entity Features
```typescript
ProductAccessMap for Innovators:
- Pitch-to-Grant: Voice-to-text grant application
- Compass: Grant recommendation engine
- FundMatch: Investor matching post-grant
```

### 2. Catalyst Entity Features
```typescript
ProductAccessMap for Catalysts:
- Grant Management
- Applicant Review
- Deal Flow Access
```

## Application Flow

### 1. Grant Application Process
```typescript
@types/application.ts
Application {
  entity_id: string;    // Innovator entity
  provider_id: string;  // Catalyst entity
  status: ApplicationStatus;
  progress: ApplicationProgress;
}
```

### 2. Matching System
```typescript
@types/matching.ts
Match {
  innovator_id: string;
  catalyst_id: string;
  grant_id?: string;
  score: number;
}
```

## UI Components & Pages

### 1. Public Pages
```typescript
@pages/public/*
- LandingPage.tsx: Initial entry point
- AboutPage.tsx: Platform information
- AuthPage.tsx: Authentication handling
```

### 2. Private Pages
```typescript
@pages/private/*
- Entity-specific dashboards
- Application management
- Profile management
```

### 3. Layout Components
```typescript
@components/layout/*
- AppLayout.tsx: Main application wrapper
- AppSidebar.tsx: Navigation and context
- NavBar.tsx: Top-level navigation
```

## Key Interactions

### 1. Entity Creation/Management
- Users can create multiple entities
- Entity type determines available features
- Team members can be added/removed

### 2. Application Process
- Only Innovator entities can create applications
- Applications are linked to specific grants
- Progress tracking per application

### 3. Matching System
- Automated matching based on criteria
- Two-way confirmation required
- Status tracking for both parties

## Data Flow

### 1. User Context
```typescript
- Authentication state
- Current active entity
- Product access permissions
```

### 2. Entity Context
```typescript
- Entity type-specific features
- Team member management
- Application/Grant management
```

## Security & Access Control

### 1. Entity-Level Security
```typescript
- Member list controls access
- Entity type restricts feature access
- Audit trail of changes
```

### 2. Application Security
```typescript
- Entity ownership verification
- Member permission checking
- Data access restrictions
```

## Form Handling

### 1. Multi-step Forms
```typescript
@components/form/multi-step-form.tsx
- Dynamic form generation
- Progress tracking
- Validation per step
```

### 2. File & Media Handling
```typescript
@components/form/file-upload-field.tsx
@components/form/media-field.tsx
- Secure file uploads
- Media recording
- Progress tracking
```

---

# Type System Architecture Analysis

## Core Entity Types

### Entity Hierarchy
The system revolves around two primary entity types: `Innovator` and `Catalyst`, both extending from `EntityBase`:

```typescript
EntityBase
├── InnovatorEntity (startups)
└── CatalystEntity (grant providers & investors)
```

### Entity Relationships
- **Innovators** (startups) are characterized by:
  - Industry classifications (`Industry[]`)
  - Development stage (`Stage`)
  - Product access mappings (`ProductAccessMap`)
  - Applications portfolio (`Application[]`)

- **Catalysts** maintain:
  - Investment thesis
  - Investment ranges (`InvestmentRange`)
  - Active grants (`string[]` of grant IDs)
  - Industry preferences (`Industry[]`)

## Application Flow

### Application Structure
Applications (`Application`) represent the core interaction between Innovators and Catalysts:

```typescript
Application
├── ApplicationProgress
│   └── SectionProgress
│       └── QuestionProgress
└── ApplicationStatus
```

The application flow follows a hierarchical structure:
1. Each application contains multiple sections
2. Sections contain questions
3. Questions track individual progress states
4. Progress is monitored at all levels (question, section, application)

### Question System
The question system (`BaseQuestion`) supports:
- Multiple value types (`BaseQuestionValueType`)
- Recursive question structures
- Validation rules (`BaseValidationTypeMap`)
- Complex response types (`BaseQuestionValue`)

## Grant System

### Grant Structure
Grants (`Grant`) are defined by:
```typescript
Grant
├── GrantSection[]
│   └── GrantQuestion[]
├── GrantRequirements
├── GrantFinancials
└── GrantTimeline
```

### Grant-Application Relationship
- Grants define the template for applications
- Applications reference grants via `grant_id`
- Grant questions extend `BaseQuestion` with `GrantQuestionContentType`

## Matching System

### Match Structure
```typescript
Match
├── MatchingCriteria
├── MatchStatus
└── Metadata
```

### Matching Flow
1. System evaluates `MatchingCriteria` against Innovator profiles
2. Generates match scores
3. Creates `Match` records with appropriate statuses
4. Tracks responses and deadlines

## Product System

### Product Architecture
```typescript
Product
├── ProductFeature[]
└── ProductAccess
    └── ProductAccessMap
```

### Product Access Control
- Products are categorized by `ProductCategory`
- Access is managed through `ProductAccess`
- Features can be individually controlled
- Access maps are stored in both User and Entity records

## Notification System

### Notification Types
```typescript
Notification
├── ApplicationNotification
├── MatchNotification
├── TeamNotification
├── ProductNotification
└── SystemNotification
```

### Notification Flow
1. Events trigger specific notification types
2. Notifications are filtered by user preferences (`NotificationPreferences`)
3. Delivered through specified channels (`NotificationChannel`)

## User System

### User Structure
```typescript
User
├── UserProfile
├── UserSettings
└── ProductAccessMap
```

### User-Entity Relationship
- Users can be associated with multiple entities
- Primary entity type is tracked
- Product access is managed at both user and entity level

## Form System

### Form Architecture
```typescript
MultiStepFormProps
├── StepConfig[]
│   └── QuestionConfig[]
└── FormConfig
```

### Form Flow
1. Forms are configured using `FormConfig`
2. Steps are managed through `StepConfig`
3. Questions are defined by `QuestionConfig`
4. Progress is tracked via `StepStatus`

---
# Catalyzator Product & User Experience Analysis

## Core Products

### 1. Pitch-to-Grant
A voice-to-text application generation system that transforms spoken pitches into professional grant applications.

#### User Journey
1. **Initial Recording**
   - Innovator records their pitch
   - System processes voice input
   
2. **Application Generation**
   ```typescript
   // Voice input transforms into structured application data
   Application {
     sections: {
       business_plan,
       financial_projection,
       team_description,
       // ...other sections
     }
   }
   ```

3. **Review & Refinement**
   - Generated content presented in multi-step form
   - Users can edit and enhance each section
   - Progress tracking via `ApplicationProgress`

### 2. Compass
AI-powered grant recommendation engine leveraging Tnufa data.

#### Matching Logic
```typescript
MatchingCriteria {
  industry: Industry[],
  stage: Stage,
  team_size: {
    min: number,
    max: number
  }
  // Other matching parameters
}
```

#### User Journey
1. **Profile Creation**
   - Startups complete their profile
   - System captures key matching criteria:
     - Industry focus
     - Development stage
     - Team composition

2. **Grant Discovery**
   - AI analyzes startup profile
   - Matches against available grants
   - Presents personalized recommendations

3. **Application Guidance**
   - Success probability indicators
   - Application requirement analysis
   - Deadline tracking

### 3. FundMatch
Intelligent matching platform connecting startups with investors.

#### For Startups
1. **Post-Grant Journey**
   ```typescript
   Match {
     innovator_id: string,
     catalyst_id: string,
     grant_id: string,
     score: number,
     criteria_met: MatchingCriteria[]
   }
   ```

2. **Investor Discovery**
   - Automatic matching with relevant investors
   - Match scoring based on:
     - Industry alignment
     - Investment stage
     - Investment range
     - Geographic preferences

#### For Investors
1. **Deal Flow Access**
   - View grant-approved startups
   - Access to promising applicants
   - Detailed company profiles

2. **Investment Process**
   - Express interest through platform
   - Track interaction history
   - Manage investment pipeline

## User Experience Flows

### 1. Innovator Journey

#### a. Onboarding
```typescript
InnovatorEntity {
  industry: Industry[],
  stage: Stage,
  team_size: number,
  product_access: ProductAccessMap
}
```

1. **Profile Creation**
   - Company details
   - Team information
   - Industry selection
   - Stage identification

2. **Product Access**
   - Initial product activation
   - Feature access configuration
   - Notification preferences setup

#### b. Grant Application Process
1. **Discovery Phase**
   - Use Compass for recommendations
   - Review matching grants
   - Assess requirements

2. **Application Phase**
   - Utilize Pitch-to-Grant
   - Multi-step form completion
   - Progress tracking
   ```typescript
   ApplicationProgress {
     sections_completed: number,
     total_sections: number,
     is_complete: boolean
   }
   ```

3. **Review Phase**
   - Application status tracking
   - Feedback incorporation
   - Document management

#### c. Investor Matching
1. **Profile Enhancement**
   - Update company metrics
   - Upload latest documents
   - Highlight grant approval

2. **Investor Engagement**
   - Review investor matches
   - Respond to interest
   - Track interactions

### 2. Catalyst Journey

#### a. Grant Provider Flow
```typescript
CatalystEntity {
  type: 'catalyst',
  active_grants: string[],
  preferred_industries: Industry[]
}
```

1. **Grant Creation**
   - Define requirements
   - Set up evaluation criteria
   - Configure application template

2. **Application Management**
   - Review submissions
   - Provide feedback
   - Track applicant progress

#### b. Investor Flow
1. **Profile Setup**
   - Investment criteria
   - Industry preferences
   - Investment range

2. **Deal Flow Management**
   - Access startup profiles
   - Express interest
   - Track engagement

## Notification System

### User Engagement
```typescript
NotificationType =
  | 'application_update'
  | 'grant_match'
  | 'investor_match'
  | 'team_invite'
  | 'product_update'
  | 'system'
```

1. **Application Updates**
   - Status changes
   - Feedback notifications
   - Deadline reminders

2. **Match Notifications**
   - New grant matches
   - Investor interest
   - Response deadlines

3. **Product Updates**
   - Feature activations
   - System announcements
   - Usage tips

## Form System Architecture

### Multi-Step Forms
```typescript
MultiStepFormProps {
  steps: StepConfig[],
  introStep?: {
    title?: string,
    message?: string
  },
  successStep?: {
    title?: string,
    message?: string
  }
}
```

1. **Progressive Disclosure**
   - Step-by-step guidance
   - Progress indication
   - Context-aware help

2. **Data Collection**
   - Structured input fields
   - File uploads
   - Media recordings

3. **Validation & Progress**
   - Real-time validation
   - Progress persistence
   - Step completion tracking

---

# Catalyzator Frontend Architecture Analysis

## Core Component Structure

### 1. Layout System
```typescript
Layout Hierarchy
├── PublicLayout
│   ├── NavBar
│   │   ├── DesktopNavbar
│   │   └── NavbarMobileMenu
│   └── Footer
└── AppLayout
    ├── NavBar
    ├── AppSidebar
    └── UserSection
```

The layout system provides two distinct experiences:
- **PublicLayout**: For unauthenticated users and marketing pages
- **AppLayout**: For authenticated users accessing the platform features

### 2. Form System Architecture

```typescript
MultiStepForm
├── IntroStep
├── QuestionField
│   ├── FileUploadField
│   ├── MediaField
│   └── QuestionGroup
└── SuccessStep
```

The form system is highly modular and supports:
- Progressive disclosure through steps
- Rich media inputs (audio/video)
- File uploads
- Nested question groups
- Validation and progress tracking

## Product Features

### 1. Pitch-to-Grant
```typescript
Components
├── Chat
│   ├── AudioRecorder
│   ├── FileUploader
│   └── MessageThread
└── GrantApplications
    ├── ApplicationStatus
    └── ProgressTracker
```

Key Features:
- Voice-to-text conversion
- Real-time chat interface
- File attachment support
- Progress tracking
- Application status management

### 2. Landing Page Components
```typescript
LandingPage
├── Header
├── AppShowcase
├── Features
└── Testimonials
```

Marketing components focus on:
- Product value proposition
- Feature demonstrations
- Social proof
- Call-to-action flows

## State Management & Data Flow

### 1. Authentication Flow
```typescript
AuthState
├── AuthModal
├── UserContext
└── ProtectedRoute
```

The system manages:
- User authentication state
- Protected route access
- Profile management
- Session persistence

### 2. Form State Management
```typescript
FormState
├── FormPersistence
├── ValidationSchema
└── ProgressTracking
```

Forms handle:
- Multi-step progress
- Data validation
- Local storage persistence
- File upload states

## Component Relationships

### 1. Navigation System
```typescript
Navigation
├── NavbarConfig
│   ├── ProductRoutes
│   ├── AuthRoutes
│   └── PublicRoutes
└── SidebarConfig
    ├── ProductAccess
    └── UserContext
```

The navigation adapts based on:
- Authentication state
- User permissions
- Product access
- Current route

### 2. Product Access Control
```typescript
ProductAccess
├── ProductFeatures
├── UserPermissions
└── AccessMaps
```

Controls:
- Feature availability
- Permission-based access
- Product activation states

## UI/UX Patterns

### 1. Responsive Design
```typescript
ResponsiveComponents
├── DesktopLayout
├── TabletLayout
└── MobileLayout
```

Components adapt to:
- Screen size
- Device capabilities
- Input methods
- Navigation patterns

### 2. Form Patterns
```typescript
FormPatterns
├── ValidationFeedback
├── ProgressIndicators
├── MediaCapture
└── FileHandling
```

Consistent patterns for:
- Error handling
- Progress visualization
- Media input
- File management

## Integration Points

### 1. API Integration
```typescript
APIIntegration
├── ProfileAPI
├── ApplicationAPI
└── GrantAPI
```

Handles:
- User data
- Application state
- Grant information
- File uploads

### 2. Third-party Services
```typescript
ExternalServices
├── Firebase
├── FileStorage
└── Analytics
```

Integrates with:
- Authentication services
- File storage
- Analytics tracking
- Voice processing

## Accessibility & Internationalization

### 1. Accessibility Features
```typescript
A11y
├── KeyboardNavigation
├── ARIA Labels
└── FocusManagement
```

Ensures:
- Keyboard accessibility
- Screen reader support
- Focus management
- ARIA compliance

### 2. Internationalization
```typescript
I18n
├── TextContent
├── DateFormatting
└── NumberFormatting
```

Supports:
- Multiple languages
- Date/time formatting
- Number formatting
- RTL layouts

