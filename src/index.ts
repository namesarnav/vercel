import express, { response } from "express";
import cors from "cors";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { generateId } from "./utils/generateid";
import simpleGit from "simple-git";
import path from "path"; 
import { getAllFiles } from "./utils/files";
import { uploadFile } from "./upload";


let app = express()
app.use(cors())
app.use(express.json());
 
const PORT = process.env.PORT || 3000 


app.get('/', (req , res ) => {
    res.send('/home')
})


app.post('/upload', async (req, res) => {
    const repoURL = req.body.repoURL

    const id = generateId()

    try {
        await simpleGit().clone(repoURL, path.join(__dirname, `output/${id}`))
    } catch (e) {
        console.log("clone failed")
        return res.status(500).json({error: "clone failed"})
    }

    const baseOutputPath = path.join(__dirname, `output/${id}`);
    const files = getAllFiles(baseOutputPath);
    
   
    try {

        files.forEach(async file =>  {
            let key = path.relative(__dirname, file); 
            key = key.replace(/\\/g, "/")
            await uploadFile(key, file)
        })


    } catch (e) {
        console.log("Upload Error", e);
        return res.status(500).json({error: "Upload Failed"})
    }


    console.log(repoURL, id)
    res.json({
        id: id
    })  
})



app.listen(PORT, () => {
    console.log("Server running on Port", PORT )
})