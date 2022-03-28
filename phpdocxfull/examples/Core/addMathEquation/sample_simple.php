<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>MathML Examples</title>`
    <script>window.MathJax = { MathML: { extensions: ["mml3.js", "content-mathml.js"] } };</script>
    <script type="text/javascript" async
            src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=MML_HTMLorMML"></script>
</head>

<body>
<?php
//error_reporting(0);
//ini_set('display_errors', 0);
require_once '../../../Classes/Phpdocx/Create/CreateDocx.php';

$transformHTMLPlugin = new Phpdocx\Transform\TransformDocAdvHTMLDefaultPlugin();

//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/dethi1.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/math1.docx');
$transform = new Phpdocx\Transform\TransformDocAdvHTMLChild('D:/xampp/htdocs/demo/phpdocxfull/examples/files/math.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML(file_get_contents('https://api.test.lotuslms.com/ufiles/2022/02/22/45/618a576d49b58f7ed15f8a45/6214856ed36739794046dd05.docx'));
$html = $transform->transform($transformHTMLPlugin);
$html = str_replace('mml=', 'xmlns=', $html);
$html = preg_replace('~<head(.*?)</head>~', "", $html);
$removeStrings = [
    '</body></html></body>',
    '<!DOCTYPE html><html><body>',
    ' m="http://schemas.openxmlformats.org/officeDocument/2006/math"'
];
$html = str_replace($removeStrings, '', $html);

echo $html;
//echo file_get_contents('https://api.test.lotuslms.com/ufiles/2022/02/22/45/618a576d49b58f7ed15f8a45/6214856ed36739794046dd05.docx')
?>
</body>

</html>
