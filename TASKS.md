# TODOs

- [ ] align forms with the design system
- [ ] implement the onStepChange callback
- [ ] implement the onSubmit callback
- [ ] validate mime types for file uploads
- [ ] implement all firebase and dal implementation from the beginning of the project
- [ ] implement fully functional form navigation and page authorization
- [ ] implement form analytics
- [ ] type system simplification and cleanup
- [ ] some app pages implementation

- [ ] fix progress steps styling
- [ ] fix calendar styling

## Folders

a list of folders that need to be review for cleanup

- [ ] components
- [ ] utils/dal/
- [ ] types

**components**
- [ ] layout
- [ ] pitch to grant
- [ ] products
- [ ] profile

### affected files

- [ ] AuthPage.tsx
- [ ] useGrants.ts
- [ ] useProductAccess.ts

## Broken links
- [ ] products menu links
- [ ] features to start usage button links

---

our order of work will be as follows:
1. implemnt the full entity DAL
2. implement the form DAL
3. we wont implement the Application, grant, and matching DALs as they are planned for another time.
4. we will implement the high level DAL that integrates with all the hooks and components.
5. integrate the high level DAL with all the hooks and components.