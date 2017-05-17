<p>=============================</p>
<h1>JavaScript Promises Challenge</h1>
<p>=============================</p>

<p>The challenge consists of 5 main parts(as shown with Requirement List on the left-hand side), 
each part will be discussed shortly.</p>

<h2>Getting Started.</h2>

<p>First of all, it is worth to say that challenge could be implemented using either Promises or callbacks.
Second one is superior to the other. While it is possible to handle asyncronous code with callbacks, as 
the size of project growth it will become hard to maintain it. The best things about Promises are 
readability and composability of the code.</p>

<p>Solution is static website that was deployed on <a target="_blank" href="https://muzakparov.github.io/hacker_news_api/">Github Pages</a>.</p>

<h3>Structure:</h3>

<p>index. html - the html boilerplate with its main table tag where all the fetched data will be appended;</p>

<p>main.css - basic styling with CSS (mostly I used Bootstrap framework for styling)</p>

<p>main.js - the most important file where fetching of data occurs, it was commented</p>



<p>*from ./public/javascript/main.js</p>
<h4>1. part Declaring main variables</h4>

    Two global variables are declared to store relevant data in an array: storyObject and its Promise.
    Because we have to get data from 3 different endpoint and then combine them in the right order
    Promise Array was necessary. Everytime we find the sight data we push it into those arrays. See
    function addTostoryObjectArray.
<h4>2. part Order of API calls</h4>

    Since using pure Javascript was one of the requirements of the challenge, I used XMLHttpRequest to  
    fetch data from endpoint. However notice asyncronousity and therefore Promise.then structure was
    used. First we get Array of IDs by storyListPromise(). Then we iterate over those IDs and create
    Promise Array for future use with userPromise() getting karma score and combining to every 
    story Object Promise.
<h4>3. part Promise.all and Sorting</h4>

    Take Promise array, sort it then create table based on these data.
<h4>4. part Seperation of promise implementation and function</h4>

     function declaration seperated from Promise implementation
<h4>5. part Displaying Table</h4>

    document methods like getElementsByTagName are used as well as innerHTML


<p>Please check comments on <a target="_blank" href="https://github.com/muzakparov/hacker_news_api/tree/gh-pages/public/javascript">main.js</a>.</p>
    
