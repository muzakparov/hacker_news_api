var storyObjectArray;//array for ultimate comprehensive story object with all required properties
var storyPromiseObjArray;//array for promise objects

//=====================
//USE OF PROMISES
//=====================

//get top 10 story ids, returns [ids]
var storyListPromise =  function(){
  return new Promise(function(resolve,reject){
      storyObjectArray=[];
      storyPromiseObjArray=[];
      var xhrStoryList = new XMLHttpRequest();
      xhrStoryList.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var storyList = JSON.parse(xhrStoryList.responseText);
            var len = storyList.length;
            var top10StoryList =[];
            var alreadyPicked=[];//already picked unique indexes
            while(top10StoryList.length<10){
            	var indexRandom = Math.floor(Math.random()*len);
              if(alreadyPicked.indexOf(indexRandom)==-1)
              	top10StoryList.push(storyList[indexRandom]);
            }            
            resolve(top10StoryList);
          }
      };
    
      xhrStoryList.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
      xhrStoryList.send();
    });
};

//get story object by its id, returns {story properties:keys}
var storyPromise = function(top10StoryId){
	return new Promise(function(resolve,reject){
		var xhrStory = new XMLHttpRequest();
		xhrStory.onreadystatechange = function(res){
		  if (this.readyState == 4 && this.status == 200) {
			resolve(JSON.parse(res.srcElement.response));        	
		  }
		};
		
		xhrStory.open("GET", "https://hacker-news.firebaseio.com/v0/item/"+top10StoryId+".json", true);
		xhrStory.send();
	  });
};

//get user object by storyObject.by property, returns {user properties:keys} 
//add user.karma property to story object
var userPromise = function(storyObject){
	return new Promise(function(resolve,reject){
		var xhrUser = new XMLHttpRequest();
		xhrUser.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var xhrUserObject = JSON.parse(xhrUser.responseText);
			storyObject.karma = xhrUserObject.karma;
			addTostoryObjectArray(storyObject);//addTostoryObjectArray function
			resolve(storyObject);
		  }
		};
		xhrUser.open("GET", "https://hacker-news.firebaseio.com/v0/user/"+storyObject.by+".json", true);
		xhrUser.send();
  });
};

//add to story object array 
var addTostoryObjectArray = function(storyObject){
	storyObjectArray.push(storyObject);
};

//sort array based on score ascendingly
var sortList = function(fullStoryList){
	return new Promise(function(response,reject){
  	fullStoryList.sort(function(a,b){
  		return parseInt(a.score)- parseInt(b.score);
  	});
    response(fullStoryList);
  });
};

//render table on table DOM element
var createTable = function(fullStoryList){  	
    var tableTag = document. getElementsByClassName("table")[0];
    var pTag = document.getElementsByTagName("p")[0];
    tableTag.innerHTML = pTag;
    console.log(fullStoryList.length);
    var textTag = `<tr>
			<th>Story Title</th>
			<th>Story URL</th>
			<th>Story Timestamp</th>
			<th>Story Score</th>
			<th>Author Id</th>
			<th>Author Karma Score</th>
		   </tr>`;	
    //go over elemet properties
    for(var i=0;i<fullStoryList.length;i++){
      var date=new Date(fullStoryList[i].time*1000);
      var day =(date.getDate()>9)?"":"0"+date.getDate();
      var month=(date.getMonth().length>9)?"":"0"+(date.getMonth()+1);
      var year=date.getFullYear();
      var text='<tr><td data-toggle="tooltip" data-placement="top" title="'+fullStoryList[i].title+'">'+(fullStoryList[i].title).substr(0,20)
			+"...</td><td><a class='btn btn-info' target='_blank' href="+fullStoryList[i].url+">"+"Read Source"
			+"</a></td><td>"+day+"/"+month+"/"+year
			+"</td><td>"+fullStoryList[i].score
			+"</td><td>"+fullStoryList[i].by
			+"</td><td>"+fullStoryList[i].karma
			+"</td></tr>";
        textTag+=text;
      }
    //adding content
    pTag.setAttribute("class","hide");
    tableTag.innerHTML = textTag;   
};

function update(){
  /* PROMISE IMPLEMENTATION */
  storyListPromise()
  .then(function(top10StoryList){
    top10StoryList.forEach(function(top10StoryId){
      storyPromiseObjArray.push(
      		storyPromise(top10StoryId).then(function(storyObject){
          	return userPromise(storyObject);
          })
        );    
    });  
  })
  .then(function(){
  	return Promise.all(storyPromiseObjArray)
    			 .then(function(storyPromiseObjArray){
              return sortList(storyObjectArray);
            });
  })
  .then(function(){
  	createTable(storyObjectArray);
  });
}

update();

console.log("end");