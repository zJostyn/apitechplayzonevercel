import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getCiudades = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('select * from vistaciudades');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getCiudadbyId = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM ciudades where id_ciudad = $1', [id]);
    return res.json(response.rows);
}

export const createCiudad = async (req: Request, res: Response): Promise<Response> =>{
    const {nombre} = req.body;
    const response: QueryResult = await pool.query('Call sp_insertar_ciudad($1)', [nombre])
    return res.json({
        message: 'City created succesfully',
        body:{
            nombre
        }
    })
}

export const updateCiudad = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {nombre} = req.body;
    await pool.query('Call sp_modificar_ciudad($1, $2)', [id, nombre]);
    return res.json(`User ${id} Updated Succesfully`);
}

export const deleteCiudad = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    await pool.query('Call sp_eliminar_ciudad($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
}