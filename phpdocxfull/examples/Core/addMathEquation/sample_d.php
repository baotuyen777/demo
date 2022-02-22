<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>MathML Examples</title>`
    <script>window.MathJax = { MathML: { extensions: ["mml3.js", "content-mathml.js"] } };</script>
                <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=MML_HTMLorMML"></script>
</head>

<body>
<?php
//error_reporting(0);
//ini_set('display_errors', 0);
require_once '../../../Classes/Phpdocx/Create/CreateDocx.php';

$transformHTMLPlugin = new Phpdocx\Transform\TransformDocAdvHTMLDefaultPlugin();

//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/dethi1.docx');
$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/math.docx');
$html = $transform->transform($transformHTMLPlugin);
$html = str_replace('mml=', 'xmlns=', $html);
$html = str_replace(' m="http://schemas.openxmlformats.org/officeDocument/2006/math"', '', $html);
echo $html;

?>
</body>

</html>
