<?php

// uses composer to sync packages

include 'vendor/autoload.php';
$parser = new \Smalot\PdfParser\Parser();

$targetDir = 'uploads/';


 if (!empty($_FILES)) {
    $targetFile = $targetDir.time().'-'. $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'],$targetFile);
 }

 // loop through all files in uploads and parse them as text
 $pdf  = $parser->parseFile( "uploads/1553487333-test_pdf1.pdf" );
 $text = $pdf->getText();
 file_put_contents("uploads/pdftext.txt", $text);

   
    
?>