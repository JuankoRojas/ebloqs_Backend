import { dirPath, dirRoot, domain } from "../config/configRoot";
import { showError } from "../models/returnmodels";
import * as fs from 'fs';
import * as Path from 'path';
import { DEBUG } from "../routes/index.routes";
import sharp from "sharp";


export async function getImgURL(paths: any, oldfile?: any) {
    try {
        var imgs: any = {}
        try {
            if (oldfile != undefined && oldfile != "") {
                oldfile = oldfile.replace(domain, dirRoot);
                await deleteFile(oldfile);
                if (DEBUG)
                    console.log("deleted file");
            }
        } catch (error) {
            if (DEBUG) {
                console.log("-------- Error Delete Old File multimedia ----------");
                console.error(error);
            }
        }

        if (paths === undefined || paths.length === 0) return imgs;

        var i = 0;
        const file = new Promise((res, ras) => {
            paths.map(async (r: any) => {
                const newpath = await optimizeIMG(r.path);
                var urlfile = newpath.replace(dirRoot, domain);
                const name: any = r.fieldname;
                imgs[name] = urlfile;
                i++;
                if (i == paths.length) {
                    res(imgs);
                }
            })
        })
        
        return file;
    } catch (error) {
        console.log(error);
        return;
    }

}

export async function deleteFile(path: any) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
        fs.rmSync(path);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function optimizeIMG(path: any) {

    const idRandom: any = (new Date().getMilliseconds() * Math.random());
    var  nramdom = Math.abs(idRandom).toString().substring(0, 1);
    const ext = Path.extname(path);
    const name = Path.basename(path);
    const dir = path.replace(name, "");
    const newname = dir + (name.replace(ext, "")) + nramdom + ext;

    console.log("start optimizer");

    await sharp(path)
        .resize(1024)
        .withMetadata()
        .jpeg({ mozjpeg: true, quality: 50 })
        .toFile(newname, (err, info) => {
            console.log("Optimizer error: " + err);
            deleteFile(path);
        })
    console.log("end optimizer ");
    return newname;
}
