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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductosbyId = exports.getComputadoras = exports.getAccesorios = exports.getConsolas = exports.getJuegos = exports.getProductosNom = exports.getProductos = void 0;
const database_1 = require("../database");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`select * from vistaproductos`);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getProductos = getProductos;
const getProductosNom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json('El nombre del producto es requerido');
        }
        nombre = nombre.trim();
        const nombreLowerCase = nombre.toLowerCase();
        const response = yield database_1.pool.query('SELECT * FROM vistaproductos WHERE LOWER(nombre) LIKE $1', ["%" + nombreLowerCase + "%"]);
        if (response.rows.length === 0) {
            return res.status(404).json('No se encontraron productos con el nombre especificado');
        }
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.error('Error al obtener productos por nombre:', err);
        return res.status(500).json('Error interno del servidor');
    }
});
exports.getProductosNom = getProductosNom;
const getJuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`select * from vistaproductos where categoria = 'Videojuegos'`);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getJuegos = getJuegos;
const getConsolas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`select * from vistaproductos where categoria = 'Consolas'`);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getConsolas = getConsolas;
const getAccesorios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`select * from vistaproductos where categoria = 'Accesorios PC'`);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getAccesorios = getAccesorios;
const getComputadoras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query(`select * from vistaproductos where categoria = 'Computadoras/portatiles'`);
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getComputadoras = getComputadoras;
const getProductosbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM productos where id_producto = $1', [id]);
    return res.json(response.rows);
});
exports.getProductosbyId = getProductosbyId;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen } = req.body;
    const response = yield database_1.pool.query('Call sp_insertar_producto($1, $2, $3, $4, $5, $6)', [id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen]);
    return res.json({
        message: 'Product created succesfully',
        body: {
            id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen
        }
    });
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen } = req.body;
    yield database_1.pool.query('Call sp_modificar_producto($1, $2, $3, $4, $5, $6, $7)', [id, id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen]);
    return res.json(`User ${id} Updated Succesfully`);
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('Call sp_eliminar_producto($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
});
exports.deleteProducto = deleteProducto;
