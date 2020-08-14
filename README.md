<h1>NC News Chronicles</h1>

<h2>NC News Chronicles is a full stack project that uses Express and Knex to make PSQL database queries, and React, Bootstrap, CSS and HTML 5 for the front end. This is the back end part of the project. To view the code for the front end please visit: https://github.com/IndigoDreams88/NCNewsChroniclesFERefactored To view the complete project please visit: https://friendly-wescoff-74185a.netlify.app/</h2>

<h3>Getting Started:</h3>
<p1>To get started cd into the folder (or create the folder) on your computer where you want to download the files in this repo to, then type <i>"git clone https://github.com/IndigoDreams88/NCNewsChroniclesBERefactored"</i> and enter your git username and password when prompted to do so. This will then clone a copy of the repo files and store them in your folder.</p1>

<h3>Installation:</h3>
<p1>Cd into the downloaded main project folder and open it on VS Code or a similar coding application using the command <i>"code ."</i>. Once the project is open in your coding application, type in the coding app terminal <i>"npm i knex express pg supertest"</i> to install the necessary app dependencies.</p1>

<h3>To view the database data:</h3>
<p1>In this project there are 4 main tables in the database, these are; Topics, Users, Articles and Comments. To seed the database you'll first need to type <i>"npm run seed-development".</i> Then to view all the data in each table, type <i>"PSQL"</i> into the coding application's terminal, then type <i>"\c nc_news_development"</i> then type <i>"select * from users;"</i> or <i>"select * from topics;"</i> or <i>"select * from articles;"</i> or <i>"select * from comments;"</i>. This will then create a visible table in the terminal of the data. It is important to remember to include the semi-colon or else PSQL will not recognise the command<p1>

<h3>Running Tests:</h3>
<p1>To run all of the tests using the test database type <i>"npm run test-app"</i> this will run through all of the tests in the app.spec.js file, located in the spec folder. To run an individual test type <i>".only"</i> after the word <i>"it"</i> and then type <i>"npm run test-app"</i>, this will then run only that test.</p1>

<h3>Built With:</h3>

<ul>
    <li>"Express": "^4.17.1"</li>
    <li>"Knex": "^0.20.2"</li>
    <li>"pg": "^7.12.1"</li>
    <li>"Supertest": "^4.0.2"</li>
   <li>"Cors": "^2.8.5"</li>

<ul>

<h3>Authors</h3>
<p1>"sams-chai-sorted" - written by Sam</p1>

<h3>Acknowledgments</h3>
<p1>Special thanks to the Northcoders</p1>
