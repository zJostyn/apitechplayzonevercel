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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClientebyId = exports.getClientes = void 0;
const database_1 = require("../database");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select * from vistaclientes');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getClientes = getClientes;
const getClientebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM clientes where id_cliente = $1', [id]);
    return res.json(response.rows);
});
exports.getClientebyId = getClientebyId;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion } = req.body;
    const response = yield database_1.pool.query('Call sp_insertar_cliente($1, $2, $3, $4, $5, $6, $7)', [id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion]);
    return res.json({
        message: 'Client created succesfully',
        body: {
            id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion
        }
    });
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion } = req.body;
    yield database_1.pool.query('Call sp_modificar_cliente($1, $2, $3, $4, $5, $6, $7, $8)', [id, id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion]);
    return res.json(`User ${id} Updated Succesfully`);
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('Call sp_eliminar_cliente($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
});
exports.deleteCliente = deleteCliente;
