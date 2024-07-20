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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriabyId = exports.getCategorias = void 0;
const database_1 = require("../database");
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM categorias');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCategorias = getCategorias;
const getCategoriabyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM categorias where id_categoria = $1', [id]);
    return res.json(response.rows);
});
exports.getCategoriabyId = getCategoriabyId;
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_nombre, cat_descripcion } = req.body;
    const response = yield database_1.pool.query('Call sp_insertar_categoria($1, $2)', [cat_nombre, cat_descripcion]);
    return res.json({
        message: 'Category created succesfully',
        body: {
            cat_nombre,
            cat_descripcion
        }
    });
});
exports.createCategoria = createCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { cat_nombre, cat_descripcion } = req.body;
    yield database_1.pool.query('Call sp_modificar_categoria($1, $2, $3)', [id, cat_nombre, cat_descripcion]);
    return res.json(`User ${id} Updated Succesfully`);
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('Call sp_eliminar_categoria($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
});
exports.deleteCategoria = deleteCategoria;
