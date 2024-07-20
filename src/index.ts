import express from 'express';
import bodyParser from 'body-parser';
import { sendEmail } from './controllers/emailService.controller';

const app = express();
app.use(bodyParser.json());

import indexRoutes from './routes/index';

//Línea de código para autorizar acceso a la API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://techplayzone.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",indexRoutes);

app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;
  
  try {
    await sendEmail(to, subject, html);
    res.status(200).send({ message: 'Correo enviado correctamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al enviar el correo', error });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});