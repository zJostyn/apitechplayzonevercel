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
exports.getTotalDelMes = exports.getTopProductos = exports.getTotalMesPorAnio = exports.obtenerIdUltimoCliente = exports.getGanancias = exports.getNumeroPedidos = exports.getNumeroProductos = exports.getNumeroClientes = void 0;
const database_1 = require("../database");
const getNumeroClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select obtener_numero_clientes()');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getNumeroClientes = getNumeroClientes;
const getNumeroProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select obtener_numero_productos()');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getNumeroProductos = getNumeroProductos;
const getNumeroPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select obtener_numero_pedidos()');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getNumeroPedidos = getNumeroPedidos;
const getGanancias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select sumar_total_detalles_pedido()');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getGanancias = getGanancias;
const obtenerIdUltimoCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('select obtenermaxidcliente()');
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.obtenerIdUltimoCliente = obtenerIdUltimoCliente;
const getTotalMesPorAnio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anio = parseInt(req.params.id);
    try {
        const response = yield database_1.pool.query('select * from obtener_total_mes($1)', [anio]);
        const mes = response.rows.map(row => row.mes);
        const total = response.rows.map(row => row.total);
        return res.status(200).json({ mes, total });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getTotalMesPorAnio = getTotalMesPorAnio;
const getTopProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const top = parseInt(req.params.id);
    try {
        const response = yield database_1.pool.query('select * from obtener_top_productos($1)', [top]);
        const producto = response.rows.map(row => row.producto);
        const cantidad = response.rows.map(row => row.cantidad);
        return res.status(200).json({ producto, cantidad });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getTopProductos = getTopProductos;
const getTotalDelMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { anio, mes } = req.body;
    try {
        const response = yield database_1.pool.query('select * from obtener_total_del_mes($1,$2)', [anio, mes]);
        const dia = response.rows.map(row => row.dia);
        const total = response.rows.map(row => row.total);
        return res.status(200).json({ dia, total });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getTotalDelMes = getTotalDelMes;
