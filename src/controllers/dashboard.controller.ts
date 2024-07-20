import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";

export const getNumeroClientes = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select obtener_numero_clientes()');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getNumeroProductos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select obtener_numero_productos()');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getNumeroPedidos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select obtener_numero_pedidos()');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getGanancias = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select sumar_total_detalles_pedido()');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }

    
}

export const obtenerIdUltimoCliente = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select obtenermaxidcliente()');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getTotalMesPorAnio = async (req: Request, res: Response): Promise<Response> => {
    const anio = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('select * from obtener_total_mes($1)', [anio]);
        const mes = response.rows.map(row => row.mes);
        const total = response.rows.map(row => row.total);
        return res.status(200).json({ mes, total });
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getTopProductos = async (req: Request, res: Response): Promise<Response> => {
    const top = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('select * from obtener_top_productos($1)', [top]);
        const producto = response.rows.map(row => row.producto);
        const cantidad = response.rows.map(row => row.cantidad);
        return res.status(200).json({ producto, cantidad });
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getTotalDelMes = async (req: Request, res: Response): Promise<Response> => {
    const {anio, mes} = req.body;
    try{
        const response: QueryResult = await pool.query('select * from obtener_total_del_mes($1,$2)', [anio,mes]);
        const dia = response.rows.map(row => row.dia);
        const total = response.rows.map(row => row.total);
        return res.status(200).json({ dia, total });
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}


