import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getClientes = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select * from vistaclientes');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getClientebyId = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM clientes where id_cliente = $1', [id]);
    return res.json(response.rows);
}

export const createCliente = async (req: Request, res: Response): Promise<Response> =>{
    const {id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion} = req.body;
    const response: QueryResult = await pool.query('Call sp_insertar_cliente($1, $2, $3, $4, $5, $6, $7)', [id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion])
    return res.json({
        message: 'Client created succesfully',
        body:{
            id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion        }
    })
}

export const updateCliente = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion} = req.body;
    await pool.query('Call sp_modificar_cliente($1, $2, $3, $4, $5, $6, $7, $8)', [id, id_genero, id_ciudad, cli_nombre, cli_apellido, cli_correoelectronico, cli_telefono, cli_direccion]);
    return res.json(`User ${id} Updated Succesfully`);
}

export const deleteCliente = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    await pool.query('Call sp_eliminar_cliente($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
}