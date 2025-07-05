import fs from "fs"; 
import path from "path"; 


export function getAllFiles(folderPath: string) {

    let response: string[] = [] // Here append name of all files as a string
    
    const allFilesAndFolder = fs.readdirSync(folderPath); 

    allFilesAndFolder.forEach(file => {

        const fullFilePath = path.join(folderPath, file); 
        

        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath )
        }
    });

    console.log(response)
    return response // return the array with filenames at the end
}

