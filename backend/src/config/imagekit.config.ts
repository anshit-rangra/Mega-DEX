import ImageKit  from "imagekit";
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv'
config()

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
})


export async function uploadImage(file: Buffer) {
    try {
        const name = uuidv4();
        const response = await imagekit.upload({
            file: file,
            fileName: name,
            folder: '/tokens'
        })
        return response;
    } catch (error) {
        console.log("Error while uploading image")
    }
}

export async function deleteImage(fileId: string) {
    try {
        await imagekit.deleteFile(fileId, function (error, result) {
            if (error) {
            console.error("ImageKit Error:", error);
            return null;
    }
        })

        return 1;
        
    } catch (error) {
        throw new Error("Image does not deleted");
    }
}