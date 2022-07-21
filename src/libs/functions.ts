import { json, Request, response, Response } from 'express';
import { connect } from '../database/database';

export async function errorValidation(e: any, res: Response): Promise<Response | void> {
    console.log(Date() + "\n Error -> " + e.message);
    await res.status(400).json({ ok: false, error: e.code, message: e.message });
}

export async function verifyEmail(email: string, res: Response, callback: any): Promise<Response | void> {
    try {
        const conn = await connect();
        const query: any = await conn.query('SELECT email FROM usuarios WHERE email = ?', email.toLowerCase());
        if (query[0].length === 1) {
            callback(true)
            return res.status(401).json({ message: "Correo ya registrado." });

        } else {
            callback(false)
        }

    } catch (error: any) {
        console.log(Date());
        console.log(error);
        errorValidation(error, res);
    }
}
export async function verifyID(uid: string, res: Response, callback: any): Promise<Response | void> {
    try {
        const conn = await connect();
        const query: any = await conn.query('SELECT uid FROM usuarios WHERE uid = ?', uid);
        if (query[0].length === 1) {
            callback(true)
            

        } else {
            callback(false)
            return res.status(401).json({ message: "ID usuario no existente." });
        }

    } catch (error: any) {
        console.log(Date());
        console.log(error);
        errorValidation(error, res);
    }
}