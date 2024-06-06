//Follow these steps-
1. FIRST OPEN THIS CODE INTO VSCODE
2. OPEN TERMINAL AND RUN COMMAND:  "npm install"
3. CREATE .ENV FILE AND WRITE INSIDE, MONGODB_URL ="mongodb+srv://dheeraj999:999dheeraj@fantasy-cricket-team-db.r6dclm2.mongodb.net/"
4. Then Run - "npm start"
5. Open chrome browser and go on "http://localhost:5000/api-docs/"  //Used swagger for api's documentation.
6. Now you can test all api's on browser, i used swagger for api documentation 
7. or you can use postmen for api testing.
******************************************


Fantasy Cricket Backend Setup-
Overview-
This project is designed to provide a backend setup for a fantasy cricket application. It leverages Node.js, Express, MongoDB, and several middleware packages to ensure optimal performance, security, and ease of data management. The application includes features such as clustering for improved performance, error handling, and a clear API structure.

Project Structure-

Entry Point-
app.js: This is the main entry point of the application where the server is configured and started. It sets up the Express application, integrates middleware, connects to MongoDB, and handles clustering for better performance.

Configuration-
.env: Contains environment variables such as the port number and MongoDB URI, which are loaded using the dotenv package.

Dependencies-
package.json: Lists all the dependencies required for the project, including Express for the server, Mongoose for MongoDB interactions, and various middleware for security, compression, and request parsing.

Middleware-
Helmet: Secures HTTP headers.
Compression: Reduces the size of response bodies to improve performance.
Body-Parser: Parses incoming request bodies to JSON format.

Clustering-
The application utilizes Node.js clustering to take advantage of multi-core processors, ensuring better performance and reliability by forking multiple worker processes.

Database Connection-
db/conn.js: Manages the connection to the MongoDB database using Mongoose. This is where the database URI from the environment variables is used to establish a connection.

Models-
Player.js, Team.js, Match.js: Mongoose models that define the schema for players, teams, and matches, respectively. These models are used to interact with the MongoDB database.

Error and Success Handling-
utils/errors.js: Contains custom error messages that are used throughout the application for consistent error handling.

utils/success.js: Contains custom success messages for consistent positive feedback.
Controllers

resultController.js: Handles the processing of match results. It calculates points for players based on match data, updates team scores, and handles any errors during the process.

teamController.js: Manages the addition of teams, including validation of team composition, roles, and ensuring captains and vice-captains are part of the team.

Routes
routes/api.js: Defines the API endpoints for the application. It maps the routes to their respective controller functions, handling requests for adding teams, processing results, and fetching team results.

Detailed Component Overview-
Result Processing and Team Management
The project includes detailed handling of match results and team management through the resultController.js, teamController.js, and calculatePoints.js files.

Result Controller (resultController.js)
This controller manages the processing of match results and retrieving team results.

processResult Function:
Fetch Data: Retrieves match data, players, and teams from the database.
Calculate Points: Iterates through each team and calculates points for each player using the calculatePoints function. Points are adjusted for captains and vice-captains with multipliers.
Error Handling: Catches errors specific to point calculation and responds with appropriate error messages.
Update and Save: Updates the team’s total points and saves the results to the database.
Response: Sends a success message upon successful processing.

getTeamResults Function:
Fetch Results: Retrieves and sorts teams based on points.
Error Handling: Sends a generic error message if any error occurs during the fetch operation.
Response: Sends the results of the team with the highest points.
Team Controller (teamController.js)
This controller manages team addition and validation.

Dependencies: Imports error messages, Mongoose models (Team, Player), and predefined roles and teams.

addTeam Function:
Request Validation: Validates the team composition ensuring exactly 11 players, and checks that each player, captain, and vice-captain are part of the team.
Player Validation: Ensures players belong to known teams and have valid roles.
Role and Team Limits: Checks for maximum players from any one team and validates the number of players in each role.
Error Handling: Responds with specific error messages if validation fails at any step.
Save Team: Creates a new team document and saves it to the database.
Response: Sends a success message upon successful team addition.

Calculate Points (calculatePoints.js)
This module calculates the points for players based on their performance in matches.

Points Configuration: Defines points for various batting, bowling, and fielding actions such as runs, wickets, catches, etc.

calculatePoints Function:
Batting Points: Calculates points based on runs, boundaries, sixes, and bonuses for specific milestones like 30, 50, or 100 runs. Negative points for a duck are also considered.
Bowling Points: Calculates points for wickets, with additional points for specific types of dismissals like LBW or bowled.
Fielding Points: Calculates points for catches, stumpings, and run-outs.
Return Total Points: Returns the total points calculated for a player based on their match performance.
Setting Up and Running the Application
Environment Configuration: Ensure you have a .env file with the necessary environment variables, particularly for the port and MongoDB URI.
Install Dependencies: Use npm install to install all required packages listed in package.json.
Start the Server: Run npm start to start the server. This uses nodemon for automatic restarts on code changes, ensuring a smooth development experience.

Key Features-
Performance Optimization: Clustering is used to utilize multiple CPU cores, enhancing the application's performance and reliability.

Security: Helmet middleware is integrated to secure HTTP headers.

Data Compression: Compression middleware reduces the size of the response bodies, improving load times and bandwidth usage.

Error Handling: Custom error messages provide clear and consistent error reporting, making debugging and user feedback more efficient.

API Structure: The application is designed with a clear API structure, making it easy to extend and maintain.
