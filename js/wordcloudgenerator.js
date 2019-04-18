
var count = 0;

function generate(){
var occurencesArr = new Array();
var checkedwords = new Array();
var wc_gridsize = Math.round(16 * $('#wordcloud_canvas').width() / 1024);
var wc_weightFactor = 10;

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
      occurencesArr = occurencesArr.slice(150, 238); //this is just for testing the size of the array.
      console.log(occurencesArr);

      WordCloud([document.getElementById('wordcloud_canvas'), document.getElementById('wordcloud_container'),], {list: occurencesArr, gridSize: wc_gridsize,
      weightFactor: wc_weightFactor});
});


}
