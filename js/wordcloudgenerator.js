
var count = 0;

var amountOfWords = 100;


function updateTextInput(val) 
{
  amountOfWords = val; 
  console.log(amountOfWords);

}


//create a cookie which is used by the php script to pass the text variable
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



//format the text for use in the php script
function processText(text){
    for (var i = 0; i < text.length; i++)
    {
      text[i] = text[i].replace(/[^\w\s]/g, ""); //had some issues with passing the text to php, this fixes some of them.
    }
  createCookie("freetext", JSON.stringify(text), "10"); //convert the array to a string using stringify and use it to create a cookie

  $.ajax({ url: 'upload.php',
  async: false, 
  success: function(data) {
   console.log('freeText Processed!');
  }
 });  //run the upload.php script to process the newly sent text

  //not the most elegant solution, but it saves me having to POST the data or redo all of the text processing in javascript.

}




//generate the word cloud
function generate(){


  var occurencesArr = new Array();
  var checkedwords = new Array();
  var wc_gridsize = 5;
  var maxFontSize = 16; //these values can be added to the options panel 
  var minFontSize = 4; 

    var freetext = document.getElementById("freeText").value;

    if(freetext != null){
      processText(freetext);
    }

    function compareSecondColumn(a, b) {
      if (a[1] === b[1]) {
          return 0;
      }
      else {
          return (a[1] < b[1]) ? -1 : 1;
      }
    }

//found problem where the json file would get cached with some browsers, causing the file to not be updated when the script is run. new Date().getTime() fixes this problem
  $.getJSON("uploads/pdftext.json?_=" + new Date().getTime(), function( words ) {
      // console.log(words);
      var numberofwords = words.length;
      
      // --- tallying occurences --------------------


      for(var i = 0; i < numberofwords; i++){ //loop through everyword
        var currentword = words[i];
        var occurences = 1; //set as one by default

        if(!checkedwords.includes(currentword)){ //if the word hasn't been counted before
        for(var j = i + 1; j < numberofwords; j++){ //check the rest of the words for occurences
            if (currentword == words[j]){
              occurences++; //add an occurence
            }
        }

        checkedwords.push(currentword); //to stop words getting counted more than once
        occurencesArr.push([currentword,occurences]);
        }
      }
      // --------------------------------------------


     
      // --- sorting values ---
      occurencesArr = occurencesArr.sort(compareSecondColumn);
      // ----------------------



      // --- normalising values ---
      var arrlength = occurencesArr.length;
      var min = occurencesArr[0][1];
      var max = occurencesArr[arrlength-1][1];

      for(var k = occurencesArr.length - 1; k > 0; k--)
      {
        var oldValue = occurencesArr[k][1];
        var newValue = (oldValue - min) / (max - min) * (maxFontSize - minFontSize) + minFontSize;
        occurencesArr[k][1] = newValue;

        // console.log(oldValue + " vs " + newValue);
      }
      // ----------------------------




      // --- wordcloud generation ---
      occurencesArr = occurencesArr.slice(occurencesArr.length - amountOfWords, occurencesArr.length); 
    
      WordCloud([document.getElementById('wordcloud_canvas'), document.getElementById('wordcloud_container')], {list: occurencesArr, gridSize: wc_gridsize,
        weightFactor: function (size) {
          return Math.pow(size, 2.3) * $('#wordcloud_canvas').width() / 2000;
      }, drawOutOfBound: true, shape: "circle"});
      // ----------------------------
});
    


}
