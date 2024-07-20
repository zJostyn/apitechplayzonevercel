"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'techplayzonesup@gmail.com', // Correo con el que se enviaran los correos
        pass: 'eqgbiiwwnrybhoqm',  // Contraseña de aplicacion creada en google
    },
});
exports.transporter.verity().then(() => {
    console.log("Ready for send emails");
});
