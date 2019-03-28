<?php
header('Content-Type: application/json');
// uses composer to sync packages

include 'vendor/autoload.php';
$dir = new RecursiveDirectoryIterator("./uploads/");
$parser = new \Smalot\PdfParser\Parser();
$words = array();


$targetDir = 'uploads/';
// echo phpversion();

 if (!empty($_FILES)) {
    $targetFile = $targetDir.time().'-'. $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'],$targetFile);
 }

 foreach ($dir as $fileinfo) {
   // if (!$fileinfo.isDot()) {
      $filename = $fileinfo->getFilename();
      
      // echo $fileinfo->getFilename() . "\n";
      $tmp = explode(".", $fileinfo->getFilename());
      $extension = end($tmp);
      if($extension == "pdf"){
         $pdf  = $parser->parseFile( $targetDir.$filename);
         $text = $pdf->getText();
         // trim($text, " \t");
         // trim($text, " \n");

         $temp_arr = explode(" ", $text);
         $words =  array_merge($words, $temp_arr); // store every word in array words


         // file_put_contents("uploads/pdftext.json", json_encode($words), FILE_APPEND);  
         
      }

        
   // }
}

// $words = preg_replace("\t","", $words);
file_put_contents("uploads/pdftext.json", json_encode($words), FILE_APPEND);
 // loop through all files in uploads and parse them as text
//  $pdf  = $parser->parseFile( "uploads/1553511324-test_pdf1.pdf" );
//  $text = $pdf->getText();
//  file_put_contents("uploads/pdftext.txt", $text);

//transfer text to more workable file format like json or txt and format it in js
   
 
?>