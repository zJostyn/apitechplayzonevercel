import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getProductos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(`select * from vistaproductos`);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}


export const getProductosNom = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { nombre } = req.body;
    
        if (!nombre) {
            return res.status(400).json('El nombre del producto es requerido');
        }
    
        nombre = nombre.trim();
    
        const nombreLowerCase = nombre.toLowerCase();
    
        const response: QueryResult = await pool.query('SELECT * FROM vistaproductos WHERE LOWER(nombre) LIKE $1', ["%" + nombreLowerCase + "%"]);
    
        if (response.rows.length === 0) {
            return res.status(404).json('No se encontraron productos con el nombre especificado');
        }
    
        return res.status(200).json(response.rows);
    } catch (err) {
        console.error('Error al obtener productos por nombre:', err);
        return res.status(500).json('Error interno del servidor');
    }
    
}

export const getJuegos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(`select * from vistaproductos where categoria = 'Videojuegos'`);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getConsolas = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(`select * from vistaproductos where categoria = 'Consolas'`);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getAccesorios = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(`select * from vistaproductos where categoria = 'Accesorios PC'`);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getComputadoras = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query(`select * from vistaproductos where categoria = 'Computadoras/portatiles'`);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}




export const getProductosbyId = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM productos where id_producto = $1', [id]);
    return res.json(response.rows);
}

export const createProducto = async (req: Request, res: Response): Promise<Response> =>{
    const {id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen} = req.body;
    const response: QueryResult = await pool.query('Call sp_insertar_producto($1, $2, $3, $4, $5, $6)', [id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen])
    return res.json({
        message: 'Product created succesfully',
        body:{
            id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen        }
    })
}

export const updateProducto = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen} = req.body;
    await pool.query('Call sp_modificar_producto($1, $2, $3, $4, $5, $6, $7)', [id, id_categoria, prod_nombre, prod_descripcion, prod_precio, prod_stock, prod_imagen]);
    return res.json(`User ${id} Updated Succesfully`);
}

export const deleteProducto = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    await pool.query('Call sp_eliminar_producto($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
}