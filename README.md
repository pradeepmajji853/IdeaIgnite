# How to Access the Project on Your Local Computer
## Step 1: Cloning the Repository
First, clone the GitHub repository to your local computer using the following command:
git clone httpslink(https://your-repository-link.git)

# Step 2: Setting Up the Frontend
Open Visual Studio Code (VSCode).
Open the terminal in VSCode.
Navigate to the FinanceTracker directory by running:
cd /path/to/FinanceTracker
Install all frontend dependencies by running:
npm install
Run the frontend development server by executing:
npm run dev
# Step 3: Setting Up the Backend
Open a new terminal in VSCode.
Navigate to the backend directory by running:
cd /path/to/backend
Install all backend dependencies by running:
npm install
Run the backend server by executing:
node server.js
# Step 4: Setting Up the Database
Install MySQL on your local computer if you haven't already.
Open MySQL Workbench.
Create a new connection in MySQL Workbench.
Run the SQL commands provided in backend/schema.sql in the MySQL query box to create the database and required tables.
Update your server code with the MySQL password you set while creating the connection. Ensure the configuration matches your MySQL setup.4

Your App is All Set to Run in the Browser
Once you have completed these steps, your application should be up and running in the browser. You can access it by navigating to http://localhost:5173 
