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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const emailService_controller_1 = require("./controllers/emailService.controller");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const index_1 = __importDefault(require("./routes/index"));
//Línea de código para autorizar acceso a la API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://techplayzone.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api", index_1.default);
app.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, html } = req.body;
    try {
        yield (0, emailService_controller_1.sendEmail)(to, subject, html);
        res.status(200).send({ message: 'Correo enviado correctamente' });
    }
    catch (error) {
        res.status(500).send({ message: 'Error al enviar el correo', error });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
