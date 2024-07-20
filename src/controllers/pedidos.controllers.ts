import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getPedidos = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select * from vistapedidos');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getPedido = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('select * from vistapedidos where id_pedido = $1', [id]);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getPedidosUsuario = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('select * from vistapedidos where id_usu = $1', [id]);
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getUltimoPedido = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT id_pedido FROM vistapedidos ORDER BY id_pedido DESC LIMIT 1;');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateEstadoPedido = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {id_estadopedido} = req.body;
    await pool.query('update pedidos set id_estadopedido = $1 where id_pedido = $2', [id_estadopedido, id]);
    return res.json(`Pedido ${id} Updated Succesfully`);
}

export const generarPedido = async (req: Request, res: Response): Promise<Response> =>{
    const {id_cliente, id_producto, cantidad, id_usu} = req.body;
    const response: QueryResult = await pool.query('Call sp_generar_pedido($1, $2, $3, $4);', [id_cliente, id_producto, cantidad, id_usu])
    return res.json({
        message: 'City created succesfully',
        body:{
            id_cliente, id_producto, cantidad, id_usu
        }
    })
}
