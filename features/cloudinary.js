import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CR_NAME,
    api_key: process.env.CR_KEY,
    api_secret: process.env.CR_SECRET,
});


export default cloudinary