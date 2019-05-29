<?php
header('Content-Type: application/json');
// uses composer to sync packages

use Skyeng\Lemmatizer;

include 'vendor/autoload.php';
$dir = new RecursiveDirectoryIterator("./uploads/");
$parser = new \Smalot\PdfParser\Parser(); //PDF Parser
$parser_docx_txt = new LukeMadhanga\DocumentParser(); //DOCX and TXT Parser
$lemma = new Lemmatizer();
$words = array();
$word_count = array();

$freeText = json_decode($_COOKIE["freetext"]);

//Regex pattern for linebreak removal
$linebreak_pattern = "/(\r)?(\n)?/";

//Read in list of stopwords and remove linebreaks from output
$stopwords = file("./stopword.txt");
$stopwords = preg_replace($linebreak_pattern, "", $stopwords);


$targetDir = 'uploads/';

if(!is_dir($targetDir))
{
  mkdir($targetDir);
}

if (!empty($_FILES)) {  //if there have been files uploaded
  $targetFile = $targetDir.time().'-'. $_FILES['file']['name'];
  move_uploaded_file($_FILES['file']['tmp_name'],$targetFile); //upload file
}

//Get text from each file
foreach ($dir as $fileinfo) {
  $filename = $fileinfo->getFilename();
  
	//seperate the filetype by seperating filename by "."
  $tmp = explode(".", $fileinfo->getFilename());

  //assign the extension and convert to lowercase	
  $extension = strtolower(end($tmp));
  
  

  switch ($extension) {
		//PDF Files
    case "pdf":
      //Read in contents of PDF file
      $pdf  = $parser->parseFile( $targetDir.$filename);
			
      //Get PDF text
      $text = $pdf->getText();

      //Break input into individual words
      $words = array_merge ($words, explode(" ", $text));
      
      


      break;

    //DOCX files
    case "docx":
      //Read in contents of the DOCX file
      $docx = $parser_docx_txt->parseFromFile($targetDir . $filename);
      
      //Remove all formatting tags and new line characters from input
      $docx = preg_replace("/(<p\srsidR=\"\d+\"\srsidRDefault=\"\d+\"\srsidP=\"\d+\">|<\/p>|\\n)/", "", $docx);
      $docx = preg_replace($pattern, "", $docx);
			
      //Break input into individual words
      $words = array_merge ($words, explode(" ", $docx));
      break;
		
    //TXT Files
    case "txt":
      //Read in contents of TXT file
      $txt = $parser_docx_txt->parseFromFile($targetDir . $filename);

      //Remove all new line characters
      $txt = preg_replace($linebreak_pattern, "", $txt);

      //Break input into individual words
      $words = array_merge ($words, explode(" ", $txt));
      break;

    default:
      break;
  }


     

   

}


  //free text processing
  if(!empty($freeText))
  {
    // echo("free text");
    
    // $pattern = "/<(\/)?(\w)+(\s)*(\w+=\"\w+\"\s*)*>|\\n/";
    // $freeText = preg_replace($pattern, "", $freeText);
    if(!empty($words))
    {
      $words = array_merge ($words, explode(" ", $freeText));
    }else{
      $words = explode(" ", $freeText);
    }
    // file_put_contents("uploads/freetext.txt", $words);
  }
   
  

  //format text

  if(!empty($words)){
      //Remove punctuation and whitespace and convert elements to lowercase
      for ($i = 0; $i < count($words); $i++) {
        $words[$i] = strtolower($words[$i]);
        $words[$i] = preg_replace("/(\s|\.|,|;|:|'|\")/", "", $words[$i]);
      }



    //Remove stopwords
      for ($i = count($words); $i > 0; $i--) { //made this increment down to prevent errors of missaligned indexes from removing the array element
        if (array_search($words[$i], $stopwords) != false) {
          unset($words[$i]);
        }
      }
      $words = array_values($words);





    //Lemmatiser
      $words_temp = array();
      for ($i = 0; $i < count($words); $i++) {
        $words_temp[$i] = $lemma->getOnlyLemmas($words[$i]);
      }
      $words = array_column($words_temp, 0);

}

      
      

// if(file_exists("uploads/pdftext.json")){
//   $old_json_contents = json_decode(file_get_contents("uploads/pdftext.json"));
//   // print $old_json_contents;
//   $words = array_merge($words, $old_json_contents);
// } //as far as i can tell this works, but i got some strange results when i ran wordcloudgenerator.js
//this is needed because if you just append onto the end of the json file, you get problems with square brackets in the middle of the file.


$json_result = json_encode($words);
// $json_result = preg_replace("/(,\"\")|(\.)/", "", $json_result); //this needs work, i'm horrible at regex.
// $json_result = preg_replace("//", "", $json_result);s
file_put_contents("uploads/pdftext.json", $json_result);  //saves words array to a json file


 
?>