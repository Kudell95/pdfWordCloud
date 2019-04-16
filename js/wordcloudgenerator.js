
var count = 0;

function generate(){

//found much better way to load json using jquery
//found problem where the json file would get cached with some browsers, causing the file to not be updated when the script is run.
  $.getJSON( "uploads/pdftext.json", function( words ) {
      console.log(words);
});




//   loadJSON(function(response) {
//     // Parse JSON string into object
//       var words = JSON.parse(response);
//       // console.log(words);
//       console.table(words.slice(0,1000));
//       // console.table(words.slice(999,2000));
//       // console.table(words.slice(1999,3000));
//    });
  
  
//   //TODO: use the "Words" array to sort through and find most common one's

//   //format the common words in a two dimmensional array, i.e. ["word", "occurence"] so it can be used by wordcloud2.js

// }; 




// function loadJSON(callback) {   

//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("uploads/pdftext.json");
//   xobj.open('GET', 'uploads/pdftext.json', true);
//   xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             callback(xobj.responseText);
//         }
//   };
//   xobj.send(null);  
}
