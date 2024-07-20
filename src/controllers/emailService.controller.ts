import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, html: string) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // Outlook, Yahoo, etc.
    auth: {
      user: 'techplayzonesup@gmail.com', // Correo con el que se enviaran los correos
      pass: 'eqgbiiwwnrybhoqm',  // Contraseña de aplicacion creada en google
    },
  });

  let mailOptions = {
    from: 'techplayzonesup@gmail.com',
    to: to,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}
