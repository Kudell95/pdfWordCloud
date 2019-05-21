var FileDrop = true;
var TextInput = true;



//set the variables as bools and initialise for flip-flop
window.onload = function(){
    //when you open the page have the dropzone as default
    $("#defaultRadio").attr('checked', true);
    $("#dropInput").toggle(FileDrop);
    $("#textInput").toggle(TextInput);
    $.ajax({ url: 'clearFiles.php' });
    
}


function clearFiles(){
    var fileDropZone = Dropzone.forElement("#mydropzone");
    $.ajax({ url: 'clearFiles.php' });
    fileDropZone.removeAllFiles();  
}



$(document).ready(function(){
    $('input[type="radio"]').click(function(){
    	var demovalue = $(this).val(); 
        $("div.content").hide();
        $("#show"+demovalue).show();
    });
});


function SwapInput()
{
    FileDrop = !FileDrop;
    TextInput = !TextInput;

    console.log(FileDrop + " " + TextInput);

    $("#dropInput").toggle(FileDrop);
    $("#textInput").toggle(TextInput);

    
}


