import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs"
import dotenv from "dotenv";

dotenv.config()

// const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID; 
// const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY


const s3 = new S3Client( {
    "region": "auto", 
    "endpoint": "https://d1c1a9a72e793e35bcbf67f859a85ae7.r2.cloudflarestorage.com",
    
    "credentials" : {
        accessKeyId : `${process.env.ACCESS_KEY_ID!}`, 
        secretAccessKey: `${process.env.SECRET_ACCESS_KEY!}`
    },
    }
)

export const uploadFile = async (filename: string, localFilePath: string) => {
    console.log("called"); 

    const fileContent = fs.readFileSync(localFilePath, 'utf8')
    
    const command = new PutObjectCommand({
        Body: fileContent, 
        Bucket: `${process.env.BUCKET_NAME}`, 
        Key: filename,
        
    }); 

    const response = await s3.send(command)
    console.log(response)
}