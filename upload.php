<?php
header('Content-Type: application/json');
// uses composer to sync packages

include 'vendor/autoload.php';
$dir = new RecursiveDirectoryIterator("./uploads/");
$parser = new \Smalot\PdfParser\Parser(); //PDF Parser
$parser_docx = new LukeMadhanga\DocumentParser(); //DOCX Parser
$words = array();


$targetDir = 'uploads/';

 if (!empty($_FILES)) {  //if there have been files uploaded
    $targetFile = $targetDir.time().'-'. $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'],$targetFile); //upload file
 }

 foreach ($dir as $fileinfo) {
 
      $filename = $fileinfo->getFilename();
      
    
      $tmp = explode(".", $fileinfo->getFilename());                 //seperate the filetype by seperating filename by "."
      $extension = strtolower(end($tmp));                            //assign the extension and convert to lowercase
      if($extension == "pdf"){                                       //if it's a pdf (will need to add docx proccessing as well)
         $pdf  = $parser->parseFile( $targetDir.$filename);          //parse the pdf
         $text = $pdf->getText();                                    //get all text in the pdf
         $temp_arr = explode(" ", $text);                            //seperate every word by a space delimiter
         $words =  array_merge($words, $temp_arr);                   // store every word in the array words
      } else if ($extension == "docx") {
				//Read in contents of the DOCX file
				$docx = $parser_docx->parseFromFile($targetDir . $filename);
				
				//Remove all DOCX tags from input
				$docx = preg_replace("/(<p\srsidR=\"\d+\"\srsidRDefault=\"\d+\"\srsidP=\"\d+\">|<\/p>|\\n)/", "", $docx);
				
				//Break input into individual words
				$words = explode(" ", $docx);
			}


}

//TODO: process the text and 


if(file_exists("uploads/pdftext.json")){
   $old_json_contents = json_decode(file_get_contents("uploads/pdftext.json"));
   print $old_json_contents;
   $words = array_merge($words, $old_json_contents);
} //as far as i can tell this works, but i got some strange results when i ran wordcloudgenerator.js
$json_result = json_encode($words);
file_put_contents("uploads/pdftext.json", $json_result);  //saves words array to a json file


 
?>