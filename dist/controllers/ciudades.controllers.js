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
exports.deleteCiudad = exports.updateCiudad = exports.createCiudad = exports.getCiudadbyId = exports.getCiudades = void 0;
const database_1 = require("../database");
const getCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select * from vistaciudades');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCiudades = getCiudades;
const getCiudadbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM ciudades where id_ciudad = $1', [id]);
    return res.json(response.rows);
});
exports.getCiudadbyId = getCiudadbyId;
const createCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    const response = yield database_1.pool.query('Call sp_insertar_ciudad($1)', [nombre]);
    return res.json({
        message: 'City created succesfully',
        body: {
            nombre
        }
    });
});
exports.createCiudad = createCiudad;
const updateCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;
    yield database_1.pool.query('Call sp_modificar_ciudad($1, $2)', [id, nombre]);
    return res.json(`User ${id} Updated Succesfully`);
});
exports.updateCiudad = updateCiudad;
const deleteCiudad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('Call sp_eliminar_ciudad($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
});
exports.deleteCiudad = deleteCiudad;
