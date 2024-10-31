# catalyzator todo 
2. WHen loading saved state form, get the data and display in placeholder when user goes back through the loaded form 
3. fix design of form page 
4. add calendar when a date is being collected on form

1. Update sign in / signup to be a modal 
2. update signup data and push to fireabse users collection 
    - user data
    - check if entity exists 
        yes: link 
        no: create and link 
3. 


Onboarding 

user sign up
    - full name
    - email
    - pwd
    - entity name 

user db schema:
    user / 
        basic information
        entity ids (many to many) / 
        transaction_stage (from transaction_stage_mapping)

transaction_stage_mapping (decide where to reroute)
    user_onboarding 0
    grant_onboarding 1
    chat 2
    grant filled 3
    grant accepted 4 


entities data db schema:
    entity id /
        - entity type
        - entity basic info
        - entity_transactions
            - grant 
                - onboarding form data  
                    dynamic schema 
                - chat outcome data == onboarding form enhanced
                    dynamic schema 
                - filled grant data 
                    dynamic schema 


1. form dates in specific fields 
2. responsive form length / scrollable 
3. guidelines for pitch needs to be simpler and desgined to fit the form 
4. pitch recording validation of file upload (mp3, mp4, wav, etc)
5. add another question to the grant form - anythign to add? anything to upload?

            

          



            
