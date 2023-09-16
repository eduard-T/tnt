<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $inquiry = $_POST["message"];

    // capitalize the name
    $name = ucfirst($name);

    // protect against SQL injection
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $inquiry = htmlspecialchars($inquiry);

    // subject
    $subject = "Inquiry submission from $name!";

    // recipient and message body
    $to = "inquiry@tntmaintenance.eu";
    $message_body = "Name: $name\r\nEmail: $email\r\n\n$inquiry";

    // send email
    mail($to, $subject, $message_body);
  } else {
    console.log("Access denied");
  }
?>
