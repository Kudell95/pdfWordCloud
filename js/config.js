var FileDrop = true;
var TextInput = true;



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

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
  

//set the variables as bools and initialise for flip-flop
window.onload = function(){
    //when you open the page have the dropzone as default
    $("#defaultRadio").attr('checked', true);
    $("#dropInput").toggle(FileDrop);
    $("#textInput").toggle(TextInput);
    $.ajax({ url: 'clearFiles.php' });

    // possible session method
    if(!document.cookie.split(';').filter((item) => item.trim().startsWith('SessionID=')).length) //check cookie existence on this pc
        createCookie("SessionID", uuidv4(), "10"); //create sessionId with random unique number, assigned to each user at window load 
    

    console.log(document.cookie.split(';').filter((item) => item.trim().startsWith('SessionID=')));
    
}

function downloadCanvas()
{
    var canvas = document.getElementById("wordcloud_canvas");
    var image = canvas.toDataURL("image/jpg");
    window.location.href = image;
    // download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}



function clearFiles(){
    var fileDropZone = Dropzone.forElement("#mydropzone");
    $.ajax({ url: 'clearFiles.php' });
    fileDropZone.removeAllFiles(); 
    document.getElementById("freeText").value = ""; //clears the freetext
    WordCloud([document.getElementById('wordcloud_canvas'), document.getElementById('wordcloud_container')], {}); //clears the wordcloud.
}


//the radiobutton div switch
$(document).ready(function(){
    $('input[type="radio"]').click(function(){
    	var demovalue = $(this).val(); 
        $("div.content").hide();
        $("#show"+demovalue).show();
    });
});





//may be redundant - will probably delete later.
function SwapInput()
{
    FileDrop = !FileDrop;
    TextInput = !TextInput;

    console.log(FileDrop + " " + TextInput);

    $("#dropInput").toggle(FileDrop);
    $("#textInput").toggle(TextInput);
    
}


