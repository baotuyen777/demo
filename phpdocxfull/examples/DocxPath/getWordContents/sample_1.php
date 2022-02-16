<?php

require_once '../../../Classes/Phpdocx/Create/CreateDocx.php';

$docx = new Phpdocx\Create\CreateDocxFromTemplate('../../files/math.docx');
//$docx->addMathEquation('../../files/math.docx', 'docx');
$referenceNode = array(
    'type' => 'paragraph',
//    'contains' => 'heading',
);

$contents = $docx->getWordContents($referenceNode);

var_dump($contents);