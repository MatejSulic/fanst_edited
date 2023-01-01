// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// export const CloudinaryUploader = cloudinary.uploader;

export const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
// export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
export const cloudinaryUploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
export const jwtSecret = process.env.JWT_SECRET;
