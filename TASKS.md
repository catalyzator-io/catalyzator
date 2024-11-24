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
