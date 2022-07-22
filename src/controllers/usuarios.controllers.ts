import { Request, Response } from 'express'
import bcrypt, { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import { body, header, validationResult } from 'express-validator';
import { connect } from '../database/database';
import { errorValidation, verifyEmail, verifyID } from '../libs/functions';
import { setUserModel } from '../models/usuario';
import { returnOK } from '../models/returnmodels';
import { getImgURL } from '../libs/validateImages';




export async function getAllUsers(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const query = await conn.query('SELECT * FROM `usuarios` WHERE status = 1')
        const userData = query[0]
        returnOK(res, userData);
    } catch (e: any) {
        errorValidation(e, res)
    }
}


export async function saveUser(req: Request, res: Response): Promise<Response | void> {
    try {
        const uid = uniqid("")
        const conn = await connect();
        const email = req.body.email;
        const userData = setUserModel(req.body)
        userData.user.uid = uid;
        const verify = verifyEmail(email, res, async (validate: any) => {
            if (validate == false) {
                console.log(userData)
                const query = await conn.query('INSERT INTO `usuarios` (`uid`, `email`, `nombre`, `apellido`, `nacionalidad`, `fecha_nacimiento`, `identificacion`, `postal`, `ciudad`, `direccion`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [userData.user.uid, userData.user.email, userData.user.nombre, userData.user.apellido, userData.user.nacionalidad, userData.user.fecha_nacimiento, userData.user.identificacion, userData.user.postal, userData.user.ciudad, userData.user.postal, userData.user.direccion])
                userData.message = "Usuario creado correctamente.";
                returnOK(res, userData);
            }
        })
    } catch (e: any) {
        errorValidation(e, res)

    }


}
export async function updateUser(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        var userData = setUserModel(req.body)
        const verify = verifyID(userData.user.uid, res, async (validate: any) => {
            if (validate == true) {
                console.log(userData.user)
                const query = await conn.query('UPDATE `usuarios` SET `nombre` = ?, `apellido` = ?, `postal` = ?, `ciudad` = ?, `direccion` = ?  WHERE `usuarios`.`uid` = ?',
                    [userData.user.nombre, userData.user.apellido, userData.user.postal, userData.user.ciudad, userData.user.direccion, userData.user.uid])
                const queryUpdated = await conn.query('SELECT * FROM `usuarios` WHERE uid = ?', [userData.user.uid])
                userData = setUserModel(queryUpdated[0][0])
                userData.message = "Usuario actualizado correctamente.";
                returnOK(res, userData);
            }
        })
    } catch (e: any) {
        errorValidation(e, res)
    }


}
export async function getUserData(req: Request, res: Response): Promise<Response | void> {
    try {
        const uid = req.body.uid;
        const conn = await connect();
        const query = await conn.query('SELECT * FROM `usuarios` WHERE uid = ?', [uid])
        const userData = query[0][0]
        returnOK(res, userData);
    } catch (e: any) {
        errorValidation(e, res)
    }
}

export async function disableUserAccount(req: Request, res: Response): Promise<Response | void> {
    try {
        const { uid, disable } = req.body;
        var status: any;
        var message: any;
        if (disable === true) status = 0, message = "Inactiva";
        if (disable === false) status = 1, message = "Activa";
        const conn = await connect();
        const query = await conn.query('UPDATE `usuarios` SET `status` = ? WHERE `usuarios`.`uid` = ? ;', [status, uid])
        // mensaje de respuesta
        const messageRes = { ok: true, message: `Cuenta ${message}` }
        returnOK(res, messageRes);
    } catch (e: any) {
        errorValidation(e, res)
    }
}

export async function uploadDocument(req: Request, res: Response): Promise<Response | void> {
    try {
        const paths: any = req.files;
        const uid = req.body.uid;
        let arrayImages: any = await getImgURL(paths);
        res.json({ "Ok": true   })
    } catch (e: any) {
        errorValidation(e, res)
    }

    // imgURL: arrayImages["image"]||arrayImages["imgURL"]||arrayImages["img"]||arrayImages["imgProfile"]
}