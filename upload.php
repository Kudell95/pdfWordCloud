<?php
$target_dir = "uploads/";
// $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;



$totalFiles = count($_FILES['fileToUpload']['name']);

for ( $i = 0;  $i < $totalFiles; $i++){
    $tmpFilePath = $_FILES['fileToUpload']['tmp_name'][$i];

    // if the file exists.
    if($tmpFilePath != "")
    {
        $newPath = "./uploads/" . $_FILES['fileToUpload']['name'][$i];
        if(move_uploaded_file($tmpFilePath, $newPath)){

            // format file here.
        }
    }

}


?>



