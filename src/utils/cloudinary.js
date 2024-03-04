import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadCloud = async (localFilePath) => {
     try {
         if (!localFilePath) return null
         cloudinary.uploader.upload(localFilePath, {
             resource_type:"auto"
         })

         console.log("file is uploaded on cloudinary successfully", response.url);
         return response
     } catch (error) {
         fs.unlinkSync(localFilePath)
         //rmeoves the temp saved file path when failed to upload on cloudinary

         return null;
     }
 }

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

export {uploadCloud}