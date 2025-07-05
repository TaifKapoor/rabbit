import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ✅ Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Multer Setup (memory storage for buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload Route (POST)
router.post('/', upload.single('image'), async (req, res) => {
    
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }
    const streamUpload =  (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                if(result){
                    resolve(result)
                }
                else{
                    reject(error)
                }
            })

            streamifier.createReadStream(fileBuffer).pipe(stream);
        })
    }

    const result = await streamUpload(req.file.buffer);

    res.json({ imageUrl: result.secure_url})
   
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});


export default router;
