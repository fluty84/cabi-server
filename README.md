# Welcome to Cabify Restaurant Server

This is the solution to the challenge posed by the Cabify team on Github => 
https://github.com/TeoDiaz/backend-bootcamp-challenge/blob/master/challenge.md

Is based on NODE.JS, EXPRESS.JS and MongoDB

API deploy => https://cabi-restaurant.herokuapp.com/api

In addition to what is required in the challenge, I have deployed a basic react frontend in the following link => 
https://cabify-restaurant.netlify.app/


## Local install and test

###Backend: At /server

    On firs open, run: `npm -i` to install all dependences.
    
    Run `npm run dev` to start the server with demon or `npm start` to run without it.
    
        .ENV configuration:
            PORT = 5005
            ORIGIN = https://cabify-restaurant.netlify.app
            MONGODB_URI = mongodb+srv://cabify:hiremeplease@cluster0.yqsmi.mongodb.net/cabi-restaurant

    - Proyect have two suits of tests made with JEST: 
        
            Run `npm test routes` to test API routes
            Run `npm test functions` to test functios suite
            Run `npm test` to test all (wihtout details)

###Frontend: at /client
    
        On firs open, run: `npm -i` to install all dependences.
        
        Run npm start to run the webpage at localhost:3000 .

## API Routes

    /eaters - POST => Create new eater
    /eaters - GET => Provides you a list of eaters
    /eaters - DELETE => Delete eaters and restaurants
    
    /restaurants - POST => Create a restaurant
    /restaurants - GET => Provides you a list of restaurants
    
    /create_groups - POST => Create equilibrated groups
    
    /groups - GET => Return all groups 
    /groups - DELETE => Delete all groups
    
    /many-eaters - POST => Creates the specified number of eaters
    
    /many-restaurants - POST => Creates the specified number of restaurants
    
###NOTE:
    Inside the alternative-version.zip you can find the example files from another alternative 
    project solution. 
    In this case instead of pushing the strings with the restaurant and eater names to the group, the objectIDs 
    are pushed, obtaining a more complete database, but which does not comply with the specifications of the exercise. 
