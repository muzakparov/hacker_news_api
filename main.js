  var storyObjectArray=[];

  function finalizeCallBack(finalCallback){
    function hNewsAPICall(callback){
    	//debugger;
      //create AJAX request object for stories
      var xhrStoryList = new XMLHttpRequest();
      xhrStoryList.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var top10StoryList = JSON.parse(xhrStoryList.responseText).slice(0,10);
          top10StoryList.forEach(function(topStoryId){
            var xhr = new XMLHttpRequest();
            var xhrObject;

            xhr.onreadystatechange = function(userCall) {
              var userCall = function(){
                  var xhrUser = new XMLHttpRequest();
                  xhrUser.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                      var xhrObjectUser = JSON.parse(xhrUser.responseText);
                      xhrObject.karma = xhrObjectUser.karma;
                      storyObjectArray.push(xhrObject);
                      storyObjectArray.sort(function(a,b){
                        return parseInt(a.score)- parseInt(b.score);
                      });
                      callback();
                    }
                  };
                  xhrUser.open("GET", "https://hacker-news.firebaseio.com/v0/user/"+xhrObject.by+".json", true);
                  xhrUser.send();
              };

                if (this.readyState == 4 && this.status == 200) {
                  xhrObject = JSON.parse(xhr.responseText);
                  userCall(function(){
                    console.log(xhrObject.karma);
                  });

                }
              };
            xhr.open("GET", "https://hacker-news.firebaseio.com/v0/item/"+topStoryId+".json", true);
            xhr.send();
         });

          console.log(storyObjectArray);
        }
      };
      xhrStoryList.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
      xhrStoryList.send();
    }

    return hNewsAPICall(function(){
    				console.log("as");
            setTimeout(function(){
              finalCallback();
            },1000);
    });
  }

  function finalCallback(){
    console.log("Inside",storyObjectArray.length);
    var tableId = document. getElementsByClassName("table")[0];
    var textTag = "<tr><th>Story Title</th><th>Story URL</th><th>Story Timestamp</th><th>Story Score</th><th>Author Id</th><th>Author Karma Score</th></tr>";

    for(var i=0;i<storyObjectArray.length;i++){
      console.log("here");
        var text="<tr><td>"+storyObjectArray[i].title+"</td><td>"+storyObjectArray[i].url+"</td><td>"+new Date(	storyObjectArray[i].time)+"</td><td>"+storyObjectArray[i].score+"</td><td>"+storyObjectArray[i].by+"</td><td>"+storyObjectArray[i].karma+"</td></tr>";
        console.log(text);
        textTag+=text;
      }
  	tableId.innerHTML = textTag;     
  }

finalizeCallBack(finalCallback);
