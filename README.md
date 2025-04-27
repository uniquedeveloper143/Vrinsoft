
## This project is a full-stack web application built using Django (backend) and React (frontend).

## Project Setup Instructions
### Backend (Django) Setup
* Clone the repository

* git clone 
* cd your-project/DemoTest

## Create and activate a virtual environment

* python -m venv env
* source env/bin/activate    # On Windows: env\Scripts\activate

## Install the required dependencies

* pip install -r requirements.txt

## Configure Environment Variables
* Create a .env file inside the backend directory and add your config/settings/.env:

## setup .env file 
* SECRET_KEY=
* API_KEY_SECRET=
* PROJECT_FULL_NAME=demo_test
* DEV_ADMIN_EMAIL=nafees.mohd@neosoftmail.com
* DB_NAME=demo_db
* DB_USER=root
* DB_PASSWORD=
* DB_HOST=127.0.0.1
* DB_PORT=3306

## Run migrations
* python manage.py migrate

## Create a superuser
* python manage.py createsuperuser

## Run the Django development server
*  manage.py runserver


## Frontend (React) Setup
* Navigate to the frontend directory


* cd ../front_app

## Install Node.js dependencies
* Make sure Node.js and npm are installed. Then run:


* npm install
* Create a .env file for React
* 
Example:
* REACT_APP_API_BASE_URL=http://localhost:8000/api/
* REACT_APP_API_KEY=

## Start the React development server

* npm start

* The React app will typically run on http://localhost:3000.

