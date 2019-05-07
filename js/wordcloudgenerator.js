
var count = 0;

var stopword = new Array;
$.get("js/stopword.txt", function( words ) {
  words = words.replace(/\r/g,"");
  stopword = words.split("\n");
}, 'text');


function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
   expires = "";
  }
  document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}


function processText(text){
    for (var i = 0; i < text.length; i++)
    {
      text[i] = text[i].replace(/[^\w\s]/g, "");
    }
  createCookie("freetext", JSON.stringify(text), "10");

  $.ajax({ url: 'upload.php' });

}


function generate(){
var occurencesArr = new Array();
var checkedwords = new Array();
var wc_gridsize = Math.round(16 * $('#wordcloud_canvas').width() / 1024);
var wc_weightFactor = 10;

var freetext = document.getElementById("freeText").value;

if(freetext != null){
  processText(freetext);
}
 

//found much better way to load json using jquery
//found problem where the json file would get cached with some browsers, causing the file to not be updated when the script is run.
  $.getJSON( "uploads/pdftext.json?_=" + new Date().getTime(), function( words ) {
      // console.log(words);
      var numberofwords = words.length;
      

      for(var i = 0; i < numberofwords; i++){ //loop through everyword
        var currentword = words[i];
        var occurences = 1; //set as one by default

        if(!checkedwords.includes(currentword)){ //if the word hasn't been counted before
        for(var j = i + 1; j < numberofwords; j++){ //check the rest of the words for occurences
            if (currentword == words[j]){
              occurences ++; //add an occurence
            }
        }

        checkedwords.push(currentword); //to stop words getting counted more than once
        occurencesArr.push([currentword,occurences]);
      }
      }

      occurencesArr = occurencesArr.sort();
      // occurencesArr = occurencesArr.slice(150, 238); //this is just for testing the size of the array.
      // console.log(occurencesArr);

      WordCloud([document.getElementById('wordcloud_canvas'), document.getElementById('wordcloud_container'),], {list: occurencesArr, gridSize: wc_gridsize,
      weightFactor: wc_weightFactor});
});


}
