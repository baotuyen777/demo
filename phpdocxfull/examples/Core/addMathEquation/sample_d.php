<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>MathML Examples</title>
    <script>window.MathJax = { MathML: { extensions: ["mml3.js", "content-mathml.js"] } };</script>
                <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=MML_HTMLorMML"></script>
</head>

<body>
<?php
//var_dump(2323);
require_once '../../../Classes/Phpdocx/Create/CreateDocx.php';

$docx = new Phpdocx\Create\CreateDocx();

$docx->addText('We extract a math equation from an external Word file:1111');

$blocks = $docx->addMathEquation('../../files/math.docx', 'docx');
//echo '<pre>';
//$transformHTMLPlugin = new TransformDocAdvHTMLDefaultPlugin();
//$transformHTMLPlugin = new Phpdocx\Transform\TransformDocAdvHTMLDefaultPlugin();
//
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/math.docx');
//$html = $transform->transform($transformHTMLPlugin);
//echo $html;
foreach ($blocks as $block) {
//    var_dump(substr($block, 0, 100));
    $isOMML = strpos($block, 'm:oMath');
//    var_dump($isOMML);
    if($isOMML){
        showMathMl($docx,$block);
    }else{
        echo $block;
    }
//    var_dump($block);
//        showMathMl($docx,$block);
//        echo $block;
    echo '</br>';
}
//showMathMl($docx, $blocks);
function showMathMl($docx, $omml)
{
    $math = $docx->transformOMMLToMathML('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:lc="http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup">
' . $omml . '
</w:document>', ['cleanNamespaces' => false, 'cleanNamespaces' => false]);
    $math = str_replace('xmlns:mml', 'xmlns', $math);
    $math = str_replace(['xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"', 'mml:'], '', $math);
    echo $math;
}

$docx->createDocx('example_addMathEq_11');
?>

</body>

</html>