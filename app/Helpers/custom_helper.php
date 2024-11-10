<?php
// app/Helpers/custom_helper.php

function getCSSPath($path){
    $filepath = FCPATH.'assets\\css\\'.$path;
    return base_url().'assets/css/'.$path.'?v='.filemtime($filepath);;
}

function getSCSSPath($path){
    $filepath = FCPATH.'assets\\scss\\'.$path;
    return base_url().'assets/scss/'.$path.'?v='.filemtime($filepath);;
}

function getJSPath($path){
    $filepath = FCPATH.'assets\\js\\'.$path;
    return base_url().'assets/js/'.$path.'?v='.filemtime($filepath);
    // $lastModified = filemtime($file);
}

function getIMGPath($path){
    $filepath = FCPATH.'assets\\img\\'.$path;
    return base_url().'assets/img/'.$path.'?v='.filemtime($filepath);;
}

function getVendorPath($path){
    $filepath = FCPATH.'vendor\\'.$path;
    return base_url().'vendor/'.$path.'?v='.filemtime($filepath);;
}

function getLibPath($path){
    $filepath = FCPATH.'assets\\lib\\'.$path;
    return base_url().'assets/lib/'.$path.'?v='.filemtime($filepath);;
}

?>