# Calendeer
Calendeer is a simple app for scheduling and managing events. With Calendeer you can create and update events and invite others to your event with their email address. Calendeer will notify you and others invited to the event 30 minutes before it occurs, even if the people you invite do not have an account.

## Installation
Clone the calendeer repo:

`git clone git@github.com:demeaus/calendeer.git`

### Frontend
The frontend directory is located in `client_calendeer/`.

Install node libraries and packages:

`npm install`

### Backend
The backend directory is located in `backend_calendeer/`.

Create and activate a virtual environment:

`python -m venv .venv`

`source .venv/bin/activate`

Install python libraries and packages:

`pip install -r requirements.txt`

Set-up database:
`python manage.py migrate`

## Run

### Run client
Server is run at http://localhost:5173/ by default.

`npm run dev`

### Run backend server
Server is run at http://localhost:8000/ by default.

`python manage.py runserver`

### Run cron job
There is a cron job for sending notifications prior to when meetings are scheduled and for removing expired events.

To run the cronjobs:

`python manage.py crontab add`

To show what cronjobs are running:

`python manage.py crontab show`

To remove the cronjobs:

`python manage.py crontab remove`

## Use
When you open the app, you can see events that the user has been either invited to or is hosting. If a user is hosting an event, they will be able to edit their event when they click the pencil icon. If they are only an invitee, they will only be able to view the event. You can add an event in the bottom right corner. 


## Design
Calendeer is built with a React frontend and a Django backend. React Query is used to manage and sync remote state. While for a small application React Query is not necessary, if it scales, it will be helpful for efficiently fetching data for different views. Even for a small application, React Query elegantly makes the app responsive and keeps data up-to-date. Reach Hook Form is used for more robust form validation, error-handling, and optimized rendering. On the backend, Django is a heavy framework, but provides many built-in features for quick prototyping and scaling. Django Rest Framework is used to streamline API creation. 

The initial Django app comes integrated with a SQLite database, which is sufficient for the scale of this app. I chose to use a SQL-based database since the relationship of User and Events can be modeled simply by the standard many-to-many relationship in a SQL database. 

## Next Steps
The app needs basic authentication and authorization in order to personalize the view for an individual user and make sure that each user cannot make API calls that they are not authorized to do. Django has built-in authentication features that could be exploited for this. Data validation on the server side should be expanded. Django Rest Framework validation for the lists of invitees is disabled, but with time to make it functional, it could be added back. Server-side data validation is missing.

It would be nice to expand the range of views offered the user. Currently, the app shows all events for a user. Even with a cronjob clearing expired events, it would quickly become overwhelming to a user to have all of their events shown them at once. The events shoulds also be separated by date and time in some way.

The notification system also needs expansion. The backend currently prints to a log a notification for users 30 minutes before their event is scheduled to occur. The backend is set-up to send emails to those users, but I could not get past 3rd-party email server authentication to be able to send emails from the backend. It would be good for the backend to push notifications to the client for users to receive notifications in-app too. Currently, the logic for emitting notifications could experience issues if there the number of events or invitees for an event gets larger due to the way loops are used. It would be better to separate the gathering of events and when their notifications need to be sent.
