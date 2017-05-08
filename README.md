=============================

JavaScript Test Assignment
=============================

The challenge consists of 5 main parts(as shown with Requirement List on the left-hand side), 
each part will be discussed shortly.

Getting Started.

First of all, it is worth to say that challenge could be implemented using either Promises or callbacks.
Second one is superior to the other. While it is possible to handle asyncronous code with callbacks, as 
the size of project growth it will become hard to maintain it. The best things about Promises are 
readability and composability of the code.

Solution is static website that was deployed on Github Pages.

Structure:

index. html - the html boilerplate with its main table tag where all the fetched data will be appended;
main.css - basic styling with CSS (mostly I used Bootstrap framework for styling)
main.js - the most important file where fetching of data occurs, it was commented


*from ./public/javascript/main.js
1. part Declaring main variables
    Two global variables are declared to store relevant data in an array: storyObject and its Promise.
    Because we have to get data from 3 different endpoint and then combine them in the right order
    Promise Array was necessary. Everytime we find the sight data we push it into those arrays. See
    function addTostoryObjectArray.
2. part Order of API calls
    Since using pure Javascript was one of the requirements of the challenge, I used XMLHttpRequest to  
    fetch data from endpoint. However notice asyncronousity and therefore Promise.then structure was
    used. First we get Array of IDs by storyListPromise(). Then we iterate over those IDs and create
    Promise Array for future use with userPromise() getting karma score and combining to every 
    story Object Promise.
3. part Promise.all and Sorting
    Take Promise array, sort it then create table based on these data.
4. part Seperation of promise implementation and function
     function declaration seperated from Promise implementation
5. part Displaying Table
    document methods like getElementsByTagName are used as well as innerHTML

Please check comments on main.js.
    
