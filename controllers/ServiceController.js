import Service from "../models/ServicesModel.js";
import asyncHandler from "express-async-handler";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const storage = multer.diskStorage({});
const upload = multer({ storage });

const createService = asyncHandler(async (req, res, next) => {
  const { name, description, price } = req.body;
  console.log(req.file);
  const image = req.file.path;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "services",
      width: 400,
      height: 300,
      crop: "fill",
    });
    const service = await Service.create({
      name,
      description,
      price,
      image: result.secure_url,
    });
    res.status(201).json({
      status: "success",
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(400);
    console.log(error.message);
    throw new Error("Invalid service data");
  }
});

const getServices = asyncHandler(async (req, res, next) => {
  const services = await Service.find({});
  res.status(200).json(services);
});

export { createService, upload, getServices };
