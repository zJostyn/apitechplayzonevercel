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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsuario = exports.verificarUsuario = exports.getUsuarios = void 0;
const database_1 = require("../database");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM usuarios');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsuarios = getUsuarios;
const verificarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pass } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usu_user = $1 AND usu_pass = $2';
    const values = [user, pass];
    try {
        const client = yield database_1.pool.connect();
        const result = yield client.query(query, values);
        client.release();
        const rowCount = result.rowCount || 0;
        if (rowCount > 0) {
            return res.status(200).json(result.rows);
        }
        else {
            return res.status(400).json({ message: 'Error: los datos ingresados son incorrectos!' });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Error en el servidor!' });
    }
});
exports.verificarUsuario = verificarUsuario;
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { usu_user, usu_pass, id_tipo } = req.body;
        const query = 'SELECT insert_user_if_not_exists($1, $2, $3) AS success';
        const values = [usu_user, usu_pass, id_tipo];
        try {
            const client = yield database_1.pool.connect();
            const result = yield client.query(query, values);
            client.release();
            if (result.rows[0].success) {
                res.status(200).json({ message: 'Se creó el dato correctamente!' });
            }
            else {
                res.status(400).json({ message: 'No se pudo guardar el dato. El usuario ya existe.' });
            }
        }
        catch (err) {
            res.status(500).json({ error: 'Error en el servidor!' });
        }
    });
}
exports.createUsuario = createUsuario;
