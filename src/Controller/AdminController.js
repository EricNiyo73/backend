import book from "../model/AdminModel.js";
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import multer from "multer";
import path from "path";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
router.use("/images", express.static(path.join(process.cwd(), "/images")));
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());
// ===================cloudinary configuration=======================
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name:process.env.CLOUDNAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});
export var upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    try {
      let ext = path.extname(file.originalname);
      if (ext !== ".pdf" && ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
        return cb(new Error("File type is not supported"), false);
      }
      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  },
});
// import { createError } from "../utils/error.js";

// ==================creation of availability book===========
export const createbook = async (req, res, next) => {
  const newbook = new book(req.body);

  try {
    const savedbook = await newbook.save();
    res.status(200).json(savedbook);
  } catch (err) {
    next(err);
  }
};

// ==================update book==========================

export const updatebook = async (req, res, next) => {
    try {
      const updatedbook = await book.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedbook);
    } catch (err) {
      next(err);
    }
  };

//   =======================update availability=========================

// export const updatebookAvailability = async (req, res, next) => {
//     try {
//       await book.updateOne(
//         { "bookNumbers._id": req.params.id },
//         {
//           $push: {
//             "bookNumbers.$.unavailableDates": req.body.dates
//           },
//         }
//       );
//       res.status(200).json("book status has been updated.");
//     } catch (err) {
//       next(err);
//     }
//   };

//   ==============================delete availability==========================

export const deletebook = async (req, res, next) => {
    try {
      await book.findByIdAndDelete(req.params.id);
      res.status(200).json("book has been deleted.");
    } catch (err) {
      next(err);
    }
  };
//   ==========================get books availability==========================
export const getbooks = async (req, res, next) => {
    try {
      const books = await book.find();
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  };