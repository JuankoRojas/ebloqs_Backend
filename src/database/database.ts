import { createPool, Pool } from 'mysql2/promise'
import { HOSTDB } from '../config/credentialsDB';

export async function connect(): Promise<Pool | any> {
    try {
        
        const connection = await createPool(HOSTDB);
        return connection;

    } catch (error: any) {
        console.error(error.message)
    }
}

export async function connectionDB(): Promise <Response | void> {
    try {
        const conn = await connect();
        var status : boolean;
        let res! :  Response ;
        const query : any = await conn.query('SELECT 1');
        await conn.end().then(() => {
            status = true;
            console.log("DB Conection: ", status)
        });
    }
    catch (e : any) {
        status = false;
        console.log("DB Conection :", status)
        console.log(Date() +"\nDB Conection: ", status, "\n ", e.message)
    }
}