<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;
if ( $method === 'POST' ) {

	$project_name = "Ваш сайт";
	$admin_email  = "kov290583@yandex.ru";
	$form_subject = "Заказ с сайта потолков" . $_SERVER['SERVER_NAME'];

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "form_subject" ) {
			if($key == 'auto_app_agree') continue;
			switch($key){
				case 'name':
					$n = 'Имя';
					break;
				case 'tel':
					$n = 'Телефон';
					break;
				case 'email':
					$n = 'E-mail';
					break;
				default:
					$n = $key;
					break;
				}
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$n</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
		}
	}
}

$message = "<table style='width: 100%;'>$message</table>";
$last = $_SERVER['SERVER_NAME'];
$tema = $_SERVER['SERVER_NAME'];

$sended = mail($admin_email, $form_subject, $message, "From: $tema" . "\r\n" . "Reply-To: $admin_email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");

if($sended){
	header('Content-Type: text/html; charset=utf-8');
	header( 'Refresh: 3; url=' . $_SERVER['HTTP_REFERER'] );
	echo '<div style="position:absolute; width:100%; top:30%; text-align:center; color:green; font-size:30px; font-weight: 700;">СПАСИБО, СООБЩЕНИЕ ОТПРАВЛЕНО :)</div>';
} else{
	header('Content-Type: text/html; charset=utf-8');
	header( 'Refresh: 3; url=' . $_SERVER['HTTP_REFERER'] );
	echo '<div style="position:absolute; width:100%; top:30%; text-align:center; color:red; font-size:30px; font-weight: 700;">ОШИБКА ОТПРАВКИ ПИСЬМА :(</div>';
}