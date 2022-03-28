<?php
/**
 * Created by PhpStorm.
 * User: khalid
 * Date: 04/26/2015
 * Time: 10:32 AM
 */

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
        $this->convert2Png();
        $this->displayImages();
    }

    function extractImages()
    {
        $ZipArchive = new ZipArchive;
        if (true === $ZipArchive->open($this->file)) {
//            var_dump($ZipArchive);die;
            for ($i = 0; $i < $ZipArchive->numFiles; $i++) {
                $zip_element = $ZipArchive->statIndex($i);
                if (preg_match("([^\s]+(\.(?i)(xml|rels))$)", $zip_element['name'])) {
                    continue;
                }
//                if (preg_match("([^\s]+(\.(?i)(jpg|jpeg|png|gif|bmp|wmf))$)", $zip_element['name'])) {
//                if (preg_match("([^\s]+(\.(?i)(wmf))$)", $zip_element['name'])) {
//                    var_dump($zip_element);
                $imagename = explode('/', $zip_element['name']);
                $imagename = end($imagename);
                var_dump($imagename);
                echo '<hr/>';
                $this->indexes[$imagename] = $i;
//                }
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

    function convert2Png()
    {
        $dir = dirname(__FILE__) . '/' . $this->savepath . '/';
//        $files = array_diff(scandir($dir), array('.', '..'));
//        foreach ($files as $filename) {
        foreach ($this->indexes as $filename => $index) {
            $path = $dir . $filename;
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            if (in_array($ext, ['wmf', 'emf'])) {
                $image = new Imagick();
//                $image->setresolution(300, 300);
                $image->readimage($path);
//                $image->resizeImage(1500, 0, Imagick::FILTER_LANCZOS, 1);
                $image->setImageFormat('png');
                $newName = str_replace($ext, 'png', $filename);
                $image->writeImage($dir . $newName);
                $this->files[] = $this->savepath . '/' .$newName;
            }
        }
//        var_dump($this->files);
    }

    function displayImages()
    {
        if (count($this->indexes) == 0) {
            return 'No images found';
        }
        $images = '';
        foreach ($this->files as $key => $file) {
//            $path = 'http://' . $_SERVER['HTTP_HOST'] . '/' . $this->savepath . '/' . $key;
//            $path = 'http://localhost/demo/Docx-to-HTML-master/' . $this->savepath . '/' . $key;
//            $images .= '<img src="' . $path . '" alt="' . $key . '" height="100"/> <br>';
            $images .= '<img src="' . $file . '" alt="' . $key . '" height="100"/> <br>';
        }
        echo $images;
    }
}

$DocxImages = new DocxImages("answer_image.docx");
