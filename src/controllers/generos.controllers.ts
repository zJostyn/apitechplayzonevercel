import { Request, Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getGeneros = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response: QueryResult = await pool.query('SELECT * FROM generos');
        return res.status(200).json(response.rows);
    }catch(err){
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}