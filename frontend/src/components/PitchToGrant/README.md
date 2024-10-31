# Pitch to Grant

## Components

### Grant Application Status Outline

The `Application Status Outline` section in the side bar shows the user the detailed status of the application.
The indication is a complete or non complete on each question/section in the specific grant (it is hierarchic and can differ between grants). The schema of the grant is sent from the firebase/BE.
All questions to the user in the chat are associated to (potentially multiple) questions/sections.

The status of the grant becomes `ready` when all are complete. In this stage, the application form will be sent in the chat to the user (with a pay-wall). The status of grant is either `suggested`, `in progress`, `ready`, `available`.

**The first question to teh user in the chat is if they are interested in this grant (sometimes skipped if the answer is known).**

### Grants/Chats

The "Chats" section or "Grants" section in the side bar is the section in which we show all the grants, the status, and what was the last transaction about the grant. when clicking on the grant, it opens the chat relevant to the specific grant.


## components plan

- there is a chat for each grant application
- the chat has a sidebar with the grant application details
- the chat has a main area for the messages
- the chat has an input area for the user to send messages
- the grant application has the current status of the application
- if there is a new message from the assistant, the status of the application is updated and there is an indication of a new message in the chat.
- each grant application is a chat with a history of messages and status updates.
- the sidebar has a list of all the grant applications with the latest message from the assistant and the status of the application.
- when a new grant application is created, it is added to the sidebar and the chat is initialized with a welcome message from the assistant.
- there is an "explore new grants" button in the sidebar that allows the user to explore new grant applications in the "Navigator" app.
    - the "explore new grants" button replaces the existing "New Application" button in the sidebar.
- the Navigator app is not implemented yet. make it blocked for now with a coming soon tooltip message (in a way similar to the products menu in the navbar).
