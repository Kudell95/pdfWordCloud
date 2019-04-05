function init(){
  

}




function generate(){
//  var words;      
  // $.getJSON("./uploads/pdftext.json", function(json) {
  //   // console.log(words); // this will show the info it in firebug console

  //   words = json;
  //   console.log(words);

    

    // rank the words here.


  // });


  //FIXME: this sorta works but doesn't seem to update when new files are added.
  loadJSON(function(response) {
    // Parse JSON string into object
      var words = JSON.parse(response);
      console.log(words);
   });
  
  
  //TODO: use the "Words" array to sort through and find most common one's

  //format the common words in a two dimmensional array, i.e. ["word", "occurence"] so it can be used by wordcloud2.js

}; 




function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("uploads/pdftext.json");
  xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}
