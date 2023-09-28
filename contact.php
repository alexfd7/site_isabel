<?php

// configure
$from = 'email@teste.com.br';
$sendTo = 'ysabelacostacoach@gmail.com'; // Add Your Email
$subject = 'Nova mensagem do formulário de contato';
$fields = array('nome' => 'Nome','telefone' => 'Telefone', 'email' => 'Email', 'mensagem' => 'Mensagem'); // array variable name => Text to appear in the email
$okMessage = 'Formulário enviado com sucesso. Obrigado, em breve entraremos em contado com você!';
$errorMessage = 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde';

// let's do the sending

try
{
    $emailText = "Você tem uma nova mensagem do formulário de contato\n=============================\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    
    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
else {
    echo $responseArray['message'];
}


//header('Location: ' . $_SERVER['HTTP_REFERER']);