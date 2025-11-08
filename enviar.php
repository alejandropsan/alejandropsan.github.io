<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST["nombre"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["mensaje"]);

    // Validate form data
    if (empty($name) || empty($email) || empty($message)) {
        $error_message = "Por favor, complete todos los campos.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Por favor, ingrese un correo electrónico válido.";
    } else {
        // Compose email
        $to = "alejandropsan1@gmail.com";
        $subject = "Nuevo mensaje de contacto desde apsan.dev";
        $body = "Nombre: " . $name . "\n";
        $body .= "Email: " . $email . "\n";
        $body .= "Mensaje: " . $message . "\n";
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            $success_message = "Gracias por tu mensaje. Me pondré en contacto contigo pronto.";
        } else {
            $error_message = "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
        }
    }

    // Redirect to contact page with message
    if (!empty($success_message)) {
        header("Location: contacto.html?success=" . urlencode($success_message));
    } elseif (!empty($error_message)) {
        header("Location: contacto.html?error=" . urlencode($error_message));
    } else {
        header("Location: contacto.html");
    }

    exit();
}

?>
