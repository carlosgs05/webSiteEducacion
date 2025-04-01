<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Código de Verificación</title>
  <style>
    /* Reset básico */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      width: 100%;
      max-width: 80%;
      background: linear-gradient(135deg, #ffffff, #F9E8ED);
      padding: 60px 100px;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
    }

    /* Icono decorativo en la esquina superior derecha */
    .decorative-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
      fill: #E4BCD3;
      opacity: 0.7;
    }

    .header {
      margin-bottom: 30px;
    }

    .header h1 {
      font-size: 28px;
      color: #262D73;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .header h1 svg {
      width: 28px;
      height: 28px;
    }

    .content p {
      color: #545454;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .code {
      font-size: 32px;
      font-weight: bold;
      color: #545454;
      background-color: #fff;
      padding: 20px 30px;
      border-radius: 8px;
      margin: 60px auto;
      display: inline-block;
      letter-spacing: 1px;
      border: 2px dashed #E4BCD3;
    }

    .footer {
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;
      margin-top: 30px;
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Icono decorativo -->
    <svg class="decorative-icon" viewBox="0 0 24 24">
      <path d="M12 1l8 4v6c0 5.55-3.84 10.74-8 12-4.16-1.26-8-6.45-8-12V5l8-4zm0 2.18L6 6.09v4.91c0 4.39 2.86 8.74 6 9.93 3.14-1.19 6-5.54 6-9.93V6.09l-6-2.91z" />
    </svg>
    <div class="header">
      <h1>
        <!-- Icono de verificación -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="#262D73" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.54 10.67L4.47 8.6a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l5-5a.75.75 0 1 0-1.06-1.06L6.54 10.67z" />
        </svg>
        Código de Verificación
      </h1>
    </div>
    <div class="content">
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>{{ config('app.name') }}</strong>.</p>
      <p>Antes de continuar, te recordamos que este proceso garantiza el acceso seguro a tu cuenta y protege tu información personal. Asegúrate de haber iniciado la solicitud desde una red segura y verifica que este correo haya sido enviado a tu dirección registrada.</p>
      <p>Para proceder, ingresa el siguiente código de verificación que se generó de manera única para tu cuenta:</p>
      <div class="code">
        {{ $code }}
      </div>
      <p>Si no solicitaste este cambio, por favor ignora este mensaje para mantener la seguridad de tu cuenta.</p>
    </div>
    <div class="footer">
      Atentamente,<br>El equipo de soporte de la Universidad Nacional de Trujillo
    </div>
  </div>
</body>

</html>