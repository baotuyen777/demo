<?php
$endpoint = "https://sandbox.zamzar.com/v1/jobs";
$apiKey = "GiVUYsF4A8ssq93FR48H";
$sourceFile = "https://s3.amazonaws.com/zamzar-samples/sample.docx";
$targetFormat = "html";

$postData = array(
    "source_file" => $sourceFile,
    "target_format" => $targetFormat
);

$ch = curl_init(); // Init curl
curl_setopt($ch, CURLOPT_URL, $endpoint); // API endpoint
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return response as a string
curl_setopt($ch, CURLOPT_USERPWD, $apiKey . ":"); // Set the API key as the basic auth username
$body = curl_exec($ch);
curl_close($ch);

$response = json_decode($body, true);
echo 1112;
echo "Response:\n---------\n";
print_r($response);