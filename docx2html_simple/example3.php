<?php
/**
 * Created by PhpStorm.
 * User: khalid
 * Date: 04/26/2015
 * Time: 10:32 AM
 */


class DocxImages
{
    private $file;
    private $indexes = [];
    /** Local directory name where images will be saved */
    private $savepath = 'docimages';

    private $files = [];

    public function __construct($filePath)
    {
        $this->file = $filePath;
        $this->extractImages();
        $this->saveAllImages();
        $this->displayImages();
    }

    function extractImages()
    {
        $ZipArchive = new ZipArchive;
        if (true === $ZipArchive->open($this->file)) {
//            var_dump($ZipArchive);die;
            for ($i = 0; $i < $ZipArchive->numFiles; $i++) {
                $zip_element = $ZipArchive->statIndex($i);
//                if (preg_match("([^\s]+(\.(?i)(jpg|jpeg|png|gif|bmp|wmf))$)", $zip_element['name'])) {
                if (preg_match("([^\s]+(\.(?i)(wmf))$)", $zip_element['name'])) {
//                    var_dump($zip_element);
                    $imagename = explode('/', $zip_element['name']);
                    $imagename = end($imagename);
                    var_dump($imagename);
                    $this->indexes[$imagename] = $i;
                }
            }
        }
    }

    function saveAllImages()
    {
        if (count($this->indexes) == 0) {
            echo 'No images found';
        }

        foreach ($this->indexes as $key => $index) {
            $zip = new ZipArchive;
            if (true === $zip->open($this->file)) {
                file_put_contents(dirname(__FILE__) . '/' . $this->savepath . '/' . $key, $zip->getFromIndex($index));
            }
            $zip->close();
        }
    }


    function displayImages()
    {
        if (count($this->indexes) == 0) {
            return 'No images found';
        }
        $images = '';
        foreach ($this->files as $key => $file) {
            $images .= '<img src="' . $file . '" alt="' . $key . '" height="100"/> <br>';
        }
        echo $images;
    }
}

$DocxImages = new DocxImages("copy_fileloi.docx");
