<?php
    $dir = new RecursiveDirectoryIterator("./uploads/");

    foreach ($dir as $fileinfo) {
        $filename = $fileinfo->getFilename();
        //seperate the filetype by seperating filename by "."
        $tmp = explode(".", $fileinfo->getFilename());
        //assign the extension and convert to lowercase	
        $extension = strtolower(end($tmp));
        

        if($extension != null && $extension != "keep") //github won't include an empty folder, so a .keep file is kept in the folder.
            unlink($fileinfo) or die("couldn't delete file"); //delete's the files
    }
?>