<html>
<head>

</head>
<body>
<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;"></canvas>
<form name="photo" id="imageUploadForm" enctype="multipart/form-data" action="" method="post">

    <input type="file" id="ImageBrowse" name="image" size="30"/>
    <input type="submit" name="upload" value="Upload"/>
</form>
<script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"></script>
<script>
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();

    function loadDoc() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            document.getElementById("demo").innerHTML = 333333;
        }
        xhttp.open("POST", "demo_post2.asp");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("fname=Henry&lname=Ford");
    }
    jQuery(document).ready(function (e) {
        jQuery('#imageUploadForm').on('submit', (function (e) {
            e.preventDefault();
            loadDoc()
            // var formData = new FormData(this);
            // console.log(formData,4444)
            // let image2 = null;
            // let blob = document.getElementById("myCanvas").toBlob(function(blob) {
            //     image2 = new File([blob], 'marked.png', { type: 'image/png' });
            //     console.log(image2)
            //     jQuery.ajax({
            //         type: 'POST',
            //         url: jQuery(this).attr('action'),
            //         data: [image2],
            //         cache: false,
            //         contentType: false,
            //         processData: false,
            //         success: function (data) {
            //             // console.log("success");
            //             // console.log(data);
            //         },
            //         error: function (data) {
            //             // console.log("error");
            //             // console.log(data);
            //         }
            //     });
            // }, 'image/png');

        }));

        jQuery("#ImageBrowse").on("change", function () {
            jQuery("#imageUploadForm").submit();
        });
    });
</script>
</body>
</html>