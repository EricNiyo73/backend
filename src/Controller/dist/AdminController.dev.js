"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookrequest = exports.getfacility = exports.getfacilit = exports.deletefacility = exports.updatefacility = exports.createfacility = exports.upload = void 0;

var _AdminModel = _interopRequireDefault(require("../model/AdminModel.js"));

var _bookUserModel = _interopRequireDefault(require("../model/bookUserModel"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = require("cloudinary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();

_dotenv["default"].config();

var app = (0, _express["default"])();
router.use("/images", _express["default"]["static"](_path["default"].join(process.cwd(), "/images")));
router.use(_bodyParser["default"].urlencoded({
  extended: true
}));
router.use(_bodyParser["default"].json()); // ===================cloudinary configuration=======================

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var upload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    try {
      var ext = _path["default"].extname(file.originalname);

      if (ext !== ".pdf" && ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("File type is not supported"), false);
      }

      cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  }
}); // import { createError } from "../utils/error.js";
// ==================creation of availability facility===========

exports.upload = upload;

var createfacility = function createfacility(req, res, next) {
  var result, newfacility, savedfacility;
  return regeneratorRuntime.async(function createfacility$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(req.file.path));

        case 2:
          result = _context.sent;
          newfacility = new _AdminModel["default"]({
            image: result.secure_url,
            facilityTitle: req.body.facilityTitle,
            subFacility: req.body.subFacility,
            capacity: req.body.capacity,
            desc: req.body.desc
          });
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(newfacility.save());

        case 7:
          savedfacility = _context.sent;
          res.status(200).json(savedfacility);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}; // ==================update facility==========================


exports.createfacility = createfacility;

var updatefacility = function updatefacility(req, res, next) {
  var updatedfacility;
  return regeneratorRuntime.async(function updatefacility$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            "new": true
          }));

        case 3:
          updatedfacility = _context2.sent;
          res.status(200).json(updatedfacility);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //   =======================update availability=========================
// export const updatefacilityAvailability = async (req, res, next) => {
//     try {
//       await facility.updateOne(
//         { "facilityNumbers._id": req.params.id },
//         {
//           $push: {
//             "facilityNumbers.$.unavailableDates": req.body.dates
//           },
//         }
//       );
//       res.status(200).json("facility status has been updated.");
//     } catch (err) {
//       next(err);
//     }
//   };
//   ==============================delete availability==========================


exports.updatefacility = updatefacility;

var deletefacility = function deletefacility(req, res, next) {
  return regeneratorRuntime.async(function deletefacility$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json("facility has been deleted.");
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; // =======================get one facility=============================


exports.deletefacility = deletefacility;

var getfacilit = function getfacilit(req, res, next) {
  var _getfacilit;

  return regeneratorRuntime.async(function getfacilit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].findById(req.params.id));

        case 3:
          _getfacilit = _context4.sent;
          res.status(200).json(_getfacilit);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //   ==========================get facility availability==========================


exports.getfacilit = getfacilit;

var getfacility = function getfacility(req, res, next) {
  var facilit;
  return regeneratorRuntime.async(function getfacility$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_AdminModel["default"].find());

        case 3:
          facilit = _context5.sent;
          res.status(200).json(facilit);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // 
// =======================admin for approving a request=================
// Endpoint for admins to approve or reject booking requests


exports.getfacility = getfacility;

var bookrequest = function bookrequest(req, res) {
  var bookingRequest;
  return regeneratorRuntime.async(function bookrequest$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_bookUserModel["default"].findById(req.params.id));

        case 3:
          bookingRequest = _context6.sent;

          if (bookingRequest) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Booking request not found'
          }));

        case 6:
          if (!(req.body.status === 'Approved')) {
            _context6.next = 13;
            break;
          }

          bookingRequest.status = req.body.status;
          _context6.next = 10;
          return regeneratorRuntime.awrap(bookingRequest.save());

        case 10:
          res.json({
            message: 'Booking request approved successfully'
          });
          _context6.next = 21;
          break;

        case 13:
          if (!(req.body.status === 'Rejected')) {
            _context6.next = 20;
            break;
          }

          bookingRequest.status = req.body.status;
          _context6.next = 17;
          return regeneratorRuntime.awrap(bookingRequest.save());

        case 17:
          res.json({
            message: 'Booking request rejected successfully'
          });
          _context6.next = 21;
          break;

        case 20:
          res.status(400).json({
            message: 'Invalid booking request status'
          });

        case 21:
          _context6.next = 27;
          break;

        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          res.status(500).json({
            message: 'Failed to update booking request'
          });

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.bookrequest = bookrequest;