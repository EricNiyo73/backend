import facility from "../model/AdminModel.js";
import BookingRequest from "../model/bookUserModel";
// import {sendBookingNotification} from "../confirmation/userNotify.js";
import  Router  from 'express';
const router = Router();
import bodyParser from 'body-parser';
import multer from "multer";
import path from "path";
import express from "express";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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

// ==================creation of availability facility===========
export const createfacility = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const newfacility = new facility({
    image: result.secure_url,
    facilityTitle: req.body.facilityTitle,
    subFacility:req.body.subFacility,
    capacity: req.body.capacity,
    desc:req.body.desc,
  });

  try {
    const savedfacility = await newfacility.save();
    res.status(200).json(savedfacility);
  } catch (err) {
    next(err);
  }
};

// ==================update facility==========================

export const updatefacility = async (req, res, next) => {
    try {
      const updatedfacility = await facility.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedfacility);
    } catch (err) {
      next(err);
    }
  };

//   ==============================delete availability==========================

export const deletefacility = async (req, res, next) => {
    try {
      await facility.findByIdAndDelete(req.params.id);
      res.status(200).json("facility has been deleted.");
    } catch (err) {
      next(err);
    }
  };

  // =======================get one facility=============================
  export const getfacilit = async (req, res, next) => {
    try {
      const getfacilit = await facility.findById(req.params.id);
      res.status(200).json(getfacilit);
    } catch (err) {
      next(err);
    }
  };
//   ==========================get facility availability==========================
export const getfacility = async (req, res, next) => {
    try {
      const facilit = await facility.find();
      res.status(200).json(facilit);
    } catch (err) {
      next(err);
    }
  };

// 
// =======================admin for approving a request=================

// Endpoint for admins to approve or reject booking requests
export const bookrequest= async (req, res) => {
  try {
    const bookingRequest = await BookingRequest.findById(req.params.id);
    let emailSubject;
    let emailBody;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    if (!bookingRequest) {
      return res.status(404).json({ message: 'Booking request not found' });
    }
    if (req.body.status === 'Approved') {
      bookingRequest.status = req.body.status;
      await bookingRequest.save();
      // ============message========================
      emailSubject = 'Booking Confirmation';
      emailBody = `<p>Dear ${bookingRequest.firstname},</p>
                   <p>Your booking has been confirmed.</p>
                   <p>Booking details:</p>
                   <ul>
                     <li>Facility: ${bookingRequest.subFacility}</li>
                     <li>Date: ${bookingRequest.date}</li>
                     <li>Time: ${bookingRequest.time}</li>
                   </ul>`;
        // ============================================
      res.json({ message: 'Booking request approved successfully' });
    } else if (req.body.status === 'Rejected'){
      bookingRequest.status = req.body.status;
      await bookingRequest.save();
      // ===================mesage====================
      emailSubject = 'Booking Rejection';
      emailBody = `<p>Dear ${bookingRequest.firstname},</p>
               <p>Your booking has been rejected.</p>
               <p>Please contact us for more details.</p>`;
      res.json({ message: 'Booking request rejected successfully' });
    }
    else {
      res.status(400).json({ message: 'Invalid booking request status' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingRequest.email,
      subject: emailSubject,
      html: emailBody
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update booking request' });
  }
};