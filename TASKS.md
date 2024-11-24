# TODOs

- [ ] footer's get started button should be disabled if user is signed in
- [ ] footer's get started button should link to the features section of the website
- [ ] fix the navigation in the features component to reference the correct product pages.
    - the navigation protection (auth guard, and form step if needed) will be implemented in the pages and not in the component referencing them.

**App pages and form steps**

- [ ] create the generic form related components, state and hooks
- [ ] create the content of the different flows
    - entity onboarding
    - pitch to grant onboarding
    - pitch to grant application
    - fundmatch onboarding
    - compass onboarding
    - profile setup
    - _the different instances will be implemented using the generic form related components and using the injected values of the form flow that will be saved in the constants folder (later in the firebase)_
- [ ] create the generic navigation guard with return to page functionality (some of the required code is alerady in the codebase)
- [ ] create the generic app layout that will use the navigation guard and the forms if needed.
- [ ] fix all references to pages in all the codebase
- [ ] implement the app pages
    - profile page
    - pitch to grant page
    - fundmatch page
    - compass page
    - app home page
    - _some of the pages have a draft version existing already, they will be used as examples and inspiration for the new pages_
    - _in the features component in the landing page, there are visualizations of the different pages, they are very good and will be used as inspiration for the new pages_

---

# Implementation Workplan

## 1. State Management
- [ ] Create Redux store structure based on our type system
  - User state (profile, settings, product access)
  - Entity state (innovator/catalyst data)
  - Application state (form progress, submissions)
  - Grant state (available grants, requirements)
  - Notifications state
  - UI state (theme, language, navigation)

## 2. Data Access Layer (DAL)
- [ ] Create base DAL utilities
  - Firebase service wrapper
  - Error handling
  - Type conversion utilities
- [ ] Implement entity-specific DALs
  - User DAL
  - Entity DAL
  - Grant DAL
  - Application DAL
  - Matching DAL
  - Notification DAL

## 3. Form System
- [ ] Create generic form components
  - Base form renderer
  - Question type components
  - Validation system
  - Progress tracking
  - Navigation controls
- [ ] Implement specific form flows
  - Entity onboarding
  - Grant application
  - Profile setup
  - Product onboarding
- [ ] Add form state management
  - Progress persistence
  - Auto-save
  - Draft management

## 4. Navigation System
- [ ] Create navigation guard with return functionality
- [ ] Implement role-based route protection
- [ ] Add form step protection
- [ ] Create generic app layout with navigation
- [ ] Fix all route references in codebase

## 5. App Pages
- [ ] Profile Page
  - User profile management
  - Entity management
  - Settings management
- [ ] Product Pages
  - Pitch to Grant
  - Fundmatch
  - Compass
- [ ] Application Home Page
  - Application status tracking
  - Review process
  - Dashboard
    - Activity feed
    - Quick actions
    - Status overview

## Priority Order
1. DAL Implementation (foundation for everything)
2. State Management (required for data flow)
3. Form System (core functionality)
4. Navigation System (user flow control)
5. App Pages (user interface)

## Notes
- Each task should be implemented using the type system we've created
- Follow atomic design principles for components
- Implement features incrementally, starting with MVP
- Maintain type safety throughout the implementation
- Document all APIs and components 