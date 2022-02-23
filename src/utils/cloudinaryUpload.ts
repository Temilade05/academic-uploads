import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import express from "express";
import multer from "multer";
import logger from "./logger";
import AppError from "../errors/AppError";
import dotenv from "dotenv";
dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
console.log(CLOUD_NAME, API_KEY, API_SECRET);
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "academic-uploads",
  } as any,
});

const upload = multer({
  // limits:{
  //   parts: Infinity,
  //   fileSize: 20*1024
  // },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new AppError("Invalid file type, only JPEG and PNG is allowed!", 400));
    }
  },

  storage: storage,
});

const uploadLocal = multer({
  limits: {
    parts: Infinity,
    fileSize: 5 * 1024 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./my-uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
});

const deleteImageFromCloudinary = async (url: string) => {
  url = url.substring(0, url.length - 4);
  const list = url.split("/");

  let start = false;
  let public_id = "";

  const n = list.length;
  for (let i = 1; i < n; i++) {
    if (start) {
      if (public_id !== "") public_id += "/";
      public_id += list[i];
    }

    if (list[i - 1] === "upload") start = true;
  }

  console.log(public_id);
  await cloudinary.uploader.destroy(
    public_id,
    { resource_type: "image" },
    function (err, res) {
      if (err) {
        logger.error(JSON.stringify(err));
        throw new AppError("Error occured while deleting image", 500);
      } else {
        logger.info(JSON.stringify(res));
      }
    }
  );
};
export { upload, deleteImageFromCloudinary, uploadLocal };
