Task Manager Project
This repository contains a Task Manager web application with separate backend and frontend folders:

task_manager_backend: Django backend REST API with JWT authentication.

task_manager_frontend: Next.js frontend with JWT-based login and task management UI.

Table of Contents
Features

Prerequisites

#######Setup and Run###########

Backend Setup (Django)

Frontend Setup (Next.js)

Usage

Troubleshooting

License

Features
Secure user login via JWT tokens.

CRUD operations on tasks (create, read, update, delete) via REST API.

React/Next.js frontend with task list, add, toggle completion, and delete.

Simple deployment-ready codebase with separate backend & frontend.

Prerequisites
Make sure you have the following installed on your machine:

Python 3.8+ (https://www.python.org/downloads/)

Node.js 16+ and npm (https://nodejs.org/)

Git (https://git-scm.com/downloads)

Optional but recommended:

A virtual environment tool such as venv (comes with Python 3)

Your preferred code editor (e.g., VSCode)

######Setup and Run#######
1. Clone the repository
bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
2. Backend Setup (Django)
Navigate to the backend folder:
bash
cd task_manager_backend
Create and activate virtual environment (recommended):
#On Windows:
bash
python -m venv venv
venv\Scripts\activate


#On Mac/Linux:
bash
python3 -m venv venv
source venv/bin/activate

###Install backend dependencies:##
bash
pip install -r requirements.txt
If requirements.txt is not present, install at least these packages:
bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
Apply migrations:
bash
python manage.py migrate
#####Create a superuser (for admin access and login):######
bash
python manage.py createsuperuser     #(this command creates new user its will ask username,email,password.)
Follow prompts to set username and password.

########Run backend development server:
bash
python manage.py runserver
Backend will start on: http://127.0.0.1:8000/

#######3. Frontend Setup (Next.js)
Open a new terminal, navigate to frontend folder:

bash
cd ../task_manager_frontend
Install frontend dependencies:
bash
npm install
(or yarn install if you use yarn)

Configure environment variable (optional)
Create a .env.local file to declare the backend API URL if needed (defaults to localhost):

text
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
Make sure this matches the backend server URL.

Run frontend development server:
bash
npm run dev
Frontend will start on: http://localhost:3000/

Usage
Open your browser to http://localhost:3000/login.

Login using the username and password you created with createsuperuser.

Access the task manager:

View your tasks

Add new tasks

Toggle completion status

Delete tasks

Logout securely, which clears tokens and redirects to login

Troubleshooting
If frontend cannot connect to backend, check:

Both servers are running.

API endpoint URLs match (NEXT_PUBLIC_API_URL set correctly).

CORS settings in Django allow frontend origin.

If migrations are not applied, run python manage.py migrate in backend.

For issues running servers, check Python and Node versions.

Delete node_modules and reinstall frontend packages if errors persist:

bash
rm -rf node_modules
npm install
