
function generate(){



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
  xobj.open('GET', 'my_data.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}
