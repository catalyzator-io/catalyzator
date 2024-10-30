# catalyzator

## TODO

- [ ] Manage the two type of profiles (catalyzator and Venture)
- [ ] Make the CatalyzatorOS product waitlist page
- [ ] Update the profile page
- [ ] improve redirect of form after entity onboarding
- [ ] improve block (protected route) logic
- [ ] write the customer agreement, privacy policy, and terms of service legal content
- [ ] Add the logo to the navbar and add the favicon
- [ ] implement the chat UI
- [ ] make sure all routings are working correctly
- [ ] add the google analytics script
- [ ] add the approve button to the signup process
- [ ] document the schema of the database
- [ ] create the routing part of the onboarding script
- [ ] document the future plan for the onboarding script
- [ ] chat document uploading


application parts - each grant has its stages. the AI defines what are in progress and what is completed. each AI message shows to which part of the application it corresponds.

where do we save the chat history? and grant application?

## DB schemas

- users
    - basic info
    - current entity id
    - entity_ids

- entity
    - basic info
    - entity transaction stage
    - (Future) plan id (to which plan the entity is registered? this defines the permissions)
    - products (mapping of product id to transaction stage and data)
        - transactions
            - (?)

- grant application
    - basic info
    - messages
    - status
    - entity_id
    - provider_id (which provider the grant application is associated with)

