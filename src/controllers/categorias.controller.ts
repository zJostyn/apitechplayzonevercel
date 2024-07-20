import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getCategorias = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM categorias');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const getCategoriabyId = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM categorias where id_categoria = $1', [id]);
    return res.json(response.rows);
}

export const createCategoria = async (req: Request, res: Response): Promise<Response> =>{
    const {cat_nombre, cat_descripcion} = req.body;
    const response: QueryResult = await pool.query('Call sp_insertar_categoria($1, $2)', [cat_nombre, cat_descripcion])
    return res.json({
        message: 'Category created succesfully',
        body:{
            cat_nombre,
            cat_descripcion
        }
    })
}

export const updateCategoria = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    const {cat_nombre, cat_descripcion} = req.body;
    await pool.query('Call sp_modificar_categoria($1, $2, $3)', [id, cat_nombre, cat_descripcion]);
    return res.json(`User ${id} Updated Succesfully`);
}

export const deleteCategoria = async (req: Request, res: Response): Promise<Response> =>{
    const id = parseInt(req.params.id);
    await pool.query('Call sp_eliminar_categoria($1)', [id]);
    return res.json(`User ${id} deleted succesfully`);
}