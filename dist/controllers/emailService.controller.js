"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(to, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            service: 'Gmail', // Outlook, Yahoo, etc.
            auth: {
                user: 'techplayzonesup@gmail.com', // Correo con el que se enviaran los correos
                pass: 'eqgbiiwwnrybhoqm', // Contraseña de aplicacion creada en google
            },
        });
        let mailOptions = {
            from: 'techplayzonesup@gmail.com',
            to: to,
            subject: subject,
            html: html,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Correo enviado correctamente');
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    });
}
exports.sendEmail = sendEmail;
