import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getUsuarios = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM usuarios');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}

export const verificarUsuario = async (req: Request, res: Response): Promise<Response> => {
    const { user, pass } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usu_user = $1 AND usu_pass = $2';
    const values = [user, pass];

    try {
        const client = await pool.connect();
        const result: QueryResult = await client.query(query, values);
        client.release();

        const rowCount = result.rowCount || 0;

        if (rowCount > 0) {
            return res.status(200).json(result.rows);
        } else {
            return res.status(400).json({ message: 'Error: los datos ingresados son incorrectos!' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error en el servidor!' });
    }
};

export async function createUsuario(req: Request, res: Response) {
    const { usu_user, usu_pass, id_tipo } = req.body;
    const query = 'SELECT insert_user_if_not_exists($1, $2, $3) AS success';
    const values = [usu_user, usu_pass, id_tipo];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rows[0].success) {
            res.status(200).json({ message: 'Se creó el dato correctamente!' });
        } else {
            res.status(400).json({ message: 'No se pudo guardar el dato. El usuario ya existe.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor!' });
    }
}
