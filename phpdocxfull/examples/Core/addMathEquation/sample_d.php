<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>MathML Examples</title>
    <script>window.MathJax = { MathML: { extensions: ["mml3.js", "content-mathml.js"] } };</script>
<!--                <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=MML_HTMLorMML"></script>-->
<!--    <script src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"></script>-->
</head>

<body>
<?php
//error_reporting(0);
//ini_set('display_errors', 0);
require_once '../../../Classes/Phpdocx/Create/CreateDocx.php';

$transformHTMLPlugin = new Phpdocx\Transform\TransformDocAdvHTMLDefaultPlugin();

//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/dethi1.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('../../files/math1.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('D:/xampp/htdocs/demo/phpdocxfull/examples/files/math.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTMLCustomize('D:/xampp/htdocs/demo/phpdocxfull/examples/files/25cau.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTMLCustomize('D:/xampp/htdocs/demo/phpdocxfull/examples/files/09_hockyso4.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTMLCustomize2('D:/xampp/htdocs/demo/phpdocxfull/examples/files/hethuc_viet.docx');
$transform = new Phpdocx\Transform\TransformDocAdvHTMLCustomize('D:/xampp/htdocs/demo/phpdocxfull/examples/files/answer_image.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('D:/xampp/htdocs/demo/phpdocxfull/examples/files/mathtype.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('D:/xampp/htdocs/demo/phpdocxfull/examples/files/table.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML('D:/xampp/htdocs/demo/phpdocxfull/examples/files/tamgiac.docx');
//$transform = new Phpdocx\Transform\TransformDocAdvHTML(file_get_contents('https://api.test.lotuslms.com/ufiles/2022/02/22/45/618a576d49b58f7ed15f8a45/6214856ed36739794046dd05.docx'));
$html = $transform->transform($transformHTMLPlugin);
$html = str_replace('mml=', 'xmlns=', $html);
$html = str_replace('<strong></strong>', '', $html);
$html = str_replace('<p></p>', '', $html);
$html = str_replace(' m="http://schemas.openxmlformats.org/officeDocument/2006/math"', '', $html);
echo $html;
//echo file_get_contents('https://api.test.lotuslms.com/ufiles/2022/02/22/45/618a576d49b58f7ed15f8a45/6214856ed36739794046dd05.docx')
?>
</body>

</html>
