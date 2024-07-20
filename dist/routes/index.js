"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const categorias_controller_1 = require("../controllers/categorias.controller");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const productos_controllers_1 = require("../controllers/productos.controllers");
const clientes_controllers_1 = require("../controllers/clientes.controllers");
const ciudades_controllers_1 = require("../controllers/ciudades.controllers");
const pedidos_controllers_1 = require("../controllers/pedidos.controllers");
const generos_controllers_1 = require("../controllers/generos.controllers");
//usuarios
router.get('/usuarios', usuarios_controller_1.getUsuarios);
router.post('/usuario', usuarios_controller_1.createUsuario);
router.post('/verificarusuario', usuarios_controller_1.verificarUsuario);
//categorias
router.get('/categorias', categorias_controller_1.getCategorias);
router.get('/categorias/:id', categorias_controller_1.getCategoriabyId);
router.post('/categorias', categorias_controller_1.createCategoria);
router.put('/categorias/:id', categorias_controller_1.updateCategoria);
router.delete('/categorias/:id', categorias_controller_1.deleteCategoria);
//dashboard
router.get('/nClientes', dashboard_controller_1.getNumeroClientes);
router.get('/nProductos', dashboard_controller_1.getNumeroProductos);
router.get('/nPedidos', dashboard_controller_1.getNumeroPedidos);
router.get('/nGanancias', dashboard_controller_1.getGanancias);
router.get('/totalmes/:id', dashboard_controller_1.getTotalMesPorAnio);
router.get('/topproductos/:id', dashboard_controller_1.getTopProductos);
router.post('/totaldelmes', dashboard_controller_1.getTotalDelMes);
//productos
router.get('/productos', productos_controllers_1.getProductos);
router.post('/busqueda', productos_controllers_1.getProductosNom);
router.get('/productos/:id', productos_controllers_1.getProductosbyId);
router.post('/productos', productos_controllers_1.createProducto);
router.put('/productos/:id', productos_controllers_1.updateProducto);
router.delete('/productos/:id', productos_controllers_1.deleteProducto);
router.get('/juegos', productos_controllers_1.getJuegos);
router.get('/consolas', productos_controllers_1.getConsolas);
router.get('/accesorios', productos_controllers_1.getAccesorios);
router.get('/computadoras', productos_controllers_1.getComputadoras);
//clientes
router.get('/clientes', clientes_controllers_1.getClientes);
router.get('/clientes/:id', clientes_controllers_1.getClientebyId);
router.post('/clientes', clientes_controllers_1.createCliente);
router.put('/clientes/:id', clientes_controllers_1.updateCliente);
router.delete('/clientes/:id', clientes_controllers_1.deleteCliente);
router.get('/ultimoCliente', dashboard_controller_1.obtenerIdUltimoCliente);
//ciudades
router.get('/ciudades', ciudades_controllers_1.getCiudades);
router.get('/ciudades/:id', ciudades_controllers_1.getCiudadbyId);
router.post('/ciudades', ciudades_controllers_1.createCiudad);
router.put('/ciudades/:id', ciudades_controllers_1.updateCiudad);
router.delete('/ciudades/:id', ciudades_controllers_1.deleteCiudad);
//pedidos
router.get('/pedido/:id', pedidos_controllers_1.getPedido);
router.get('/pedidos', pedidos_controllers_1.getPedidos);
router.get('/mispedidos/:id', pedidos_controllers_1.getPedidosUsuario);
router.get('/ultimopedido', pedidos_controllers_1.getUltimoPedido);
router.put('/pedidos/:id', pedidos_controllers_1.updateEstadoPedido);
router.post('/pedidos', pedidos_controllers_1.generarPedido);
//Generos
router.get('/generos', generos_controllers_1.getGeneros);
exports.default = router;
