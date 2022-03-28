<?php
$str="<p><strong>Câu 1: </strong>Truyện Con rồng cháu tiên thuộc thể loại văn học nào? </p><p><img src='https://docs-converter.lotuslms.com/media/2022/02/22/14/61b4afcc65b7a21dd927d614/6214c60ab7a87d2cf966cae9/1.png' /></p><p>A. Truyện ngụ ngôn</p><p><strong>B. Truyện truyền thuyết</strong></p><p>C. Truyện cổ tích</p><p>D. Truyện trung đại</p>";
$str1 = preg_replace('~<strong(.*?)</strong>~', "", $str);
echo $str1;
