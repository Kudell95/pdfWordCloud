<?php
header('Content-Type: application/json');
// uses composer to sync packages

include 'vendor/autoload.php';
$dir = new RecursiveDirectoryIterator("./uploads/");
$parser = new \Smalot\PdfParser\Parser();
$words = array();


$targetDir = 'uploads/';

 if (!empty($_FILES)) {  //if there have been files uploaded
    $targetFile = $targetDir.time().'-'. $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'],$targetFile); //upload file
 }

 foreach ($dir as $fileinfo) {
 
      $filename = $fileinfo->getFilename();
      
    
      $tmp = explode(".", $fileinfo->getFilename());                 //seperate the filetype by seperating filename by "."
      $extension = end($tmp);                                        //assign the extension
      if($extension == "pdf"){                                       //if it's a pdf (will need to add docx proccessing as well)
         $pdf  = $parser->parseFile( $targetDir.$filename);          //parse the pdf
         $text = $pdf->getText();                                    //get all text in the pdf
         $temp_arr = explode(" ", $text);                            //seperate every word by a space delimiter
         $words =  array_merge($words, $temp_arr);                   // store every word in the array words
      }


}

//TODO: process the text and 

file_put_contents("uploads/pdftext.json", json_encode($words), FILE_APPEND);  //saves words array to a json file


 
?>