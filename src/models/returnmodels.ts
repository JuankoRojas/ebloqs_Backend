import { Response } from "express";
import { DEBUG } from "../routes/index.routes";
export function returnConflict(res: Response, obj: any, code?: any) {
    returnmessageerror(res, 409, obj);
}

export function returnNotFound(res: Response, obj: any, code?: any) {
    returnmessageerror(res, 404, obj);
}
export function returnUnauthorized(res: Response, obj: any, code?: any) {
    returnmessageerror(res, 401, obj);
}
export function returnBadReq(res: Response, obj: any, code?: any) {
    returnmessageerror(res, 400, obj);
}
export function returnServerError(res: Response, obj: any, code?: any) {
    returnmessageerror(res, 500, obj);
}

//----------------- Return OK -------------------------
export function returnOK(res: Response, obj: any) {

    returnmessage(res, 200,  obj);
}

//-------------------- Return master ---------------------

function returnmessage(res: Response, status: any, obj: any) {
    if (DEBUG) {

        console.log("_");
        console.warn("-------- LOG -------- ")
        console.log(Date());
        console.log();
        console.error(obj)
        console.log("-----------------------")
        console.log("_");

    }

    return res.status(status).json(obj);
}
function returnmessageerror(res: Response, status: any, obj: any, code?: any) {
    showError(obj);

    const model = {
        // status: obj?.status || status || "",
        message: obj?.message || obj || ""
    }
    return res.status(status).json(model)|| true;
}

export function showError(obj: any) {
    console.log("_");
    console.warn("-------- Error -------- ")
    console.log(Date());
    console.log();
    console.error(obj)
    console.log("-----------------------")
    console.log("_");
}