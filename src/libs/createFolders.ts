// Create Folders Init
import { dirPath, dirRoot } from "../config/configRoot";

export var folderList: any = {
    "files": `${dirPath}/files`,
    "img": `${dirPath}/imgs`,
    "DI": `${dirPath}/DI`
}
export function createFolders() {
    var fs = require('fs');

    console.log("Reading folder structure:");

    if (!fs.existsSync(dirRoot)) {
        fs.mkdirSync(dirRoot);
        console.log(`${dirRoot} created.`)
    }

    Object.keys(folderList).map((key: any) => {
        if (!fs.existsSync(folderList[key])) {
            fs.mkdirSync(folderList[key]);
            console.log("folder " + key + " created");
        } else {
            console.log("folder " + key + " found");

        }

    })


}