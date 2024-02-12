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
    // check if a user is logged in by checking the req.user object
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if (!loggedInUser) {
      return res.status(401).json({
        status: "fail",
        message: "You must be logged in to create a service",
      });
    }
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
      provider: loggedInUser, // this is the user id of the logged in user
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
  const services = await Service.find({}).populate(
    "provider",
    "firstName email whatsApp"
  );
  res.status(200).json(services);
});

// delete service
const deleteService = asyncHandler(async (req, res, next) => {
  // use find by id and delete
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "No service found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Service deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

const latestServices = asyncHandler(async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching latest services",
    });
  }
});

const getSingleservice = asyncHandler(async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        status: "fail",
        message: "No service found with that ID",
      });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred fetching service details",
    });
  }
});

export {
  createService,
  upload,
  getSingleservice,
  getServices,
  deleteService,
  latestServices,
};
