"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getbooks = exports.getbook = exports.deletebook = exports.updatebook = exports.createbooking = void 0;
var _bookUserModel = _interopRequireDefault(require("../model/bookUserModel.js"));
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// ==================creation of availability book===========
var createbooking = function createbooking(req, res) {
  var user, date, time, existingBooking, bookingData, booking;
  return regeneratorRuntime.async(function createbooking$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.userId));
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 6:
          date = req.body.date;
          time = req.body.time;
          _context.next = 10;
          return regeneratorRuntime.awrap(_bookUserModel["default"].findOne({
            availability: {
              $elemMatch: {
                date: {
                  $eq: date
                },
                time: {
                  $eq: time
                }
              }
            } // 'availability.isAvailable': true,
            // maxPeople: { $gte: capacity },
          }));

        case 10:
          existingBooking = _context.sent;
          if (!existingBooking) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(401).json("No available booking for the specified date and time"));
        case 15:
          bookingData = _objectSpread({}, req.body, {
            firstname: user.firstname,
            lastname: user.lastname
          }); // create a new booking

          booking = new _bookUserModel["default"](bookingData); // booking.roomUser = availableBooking._id;

          _context.next = 19;
          return regeneratorRuntime.awrap(booking.save());
        case 19:
          return _context.abrupt("return", res.status(200).json({
            message: "Booking request submitted successfully",
            booking: booking
          }));
        case 20:
          _context.next = 26;
          break;
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json("failed"));
        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}; // export const createbooking = async (req, res,date, time,capacity) => {
//   try{
//   book.findOne({ 
//     'availability.date': date, 
//     'availability.time': time, 
//     'availability.isAvailable': true},
//      (err, bookuser) => {
//     if (err) {
//       return res.status(500).json("there is an error");
//     } else if (!bookuser) {
//       return res.status(401).json("No available booking for the specified date and time");
//     } else {
//       // create a new booking
//       const booking = new book(req.body);
//       booking.save((err,booking)=>{
//         if(err){
//           return res.status(500).json("failed");
//         }
//         else {
//           return res.status(200).json({
//             message: "success",
//             booking
//           });
//         }
//       });
//     }
//   });
//   } catch (err) {
//     next(err);
//   }
// const newbook = new book(req.body);
// try {
//   const savedbook = await newbook.save();
//   res.status(200).json(savedbook);
// } catch (err) {
//   next(err);
// }
// };
// ==================update book==========================

exports.createbooking = createbooking;
var updatebook = function updatebook(req, res, next) {
  var updatedbook;
  return regeneratorRuntime.async(function updatebook$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_bookUserModel["default"].findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            "new": true
          }));
        case 3:
          updatedbook = _context2.sent;
          res.status(200).json(updatedbook);
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
}; //   ==============================delete ==========================

exports.updatebook = updatebook;
var deletebook = function deletebook(req, res) {
  var booking;
  return regeneratorRuntime.async(function deletebook$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_bookUserModel["default"].findByIdAndDelete(req.params.id));
        case 3:
          booking = _context3.sent;
          if (booking) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            status: "failed",
            message: "booking not found"
          }));
        case 6:
          return _context3.abrupt("return", res.status(204).json({
            status: "success",
            data: "booking deleted successfuly"
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(400).json({
            status: "failed",
            error: _context3.t0
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //   ==============================get one book================================

exports.deletebook = deletebook;
var getbook = function getbook(req, res, next) {
  var _getbook;
  return regeneratorRuntime.async(function getbook$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_bookUserModel["default"].findById(req.params.id));
        case 3:
          _getbook = _context4.sent;
          res.status(200).json(_getbook);
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
}; //   ==========================get books availability==========================

exports.getbook = getbook;
var getbooks = function getbooks(req, res, next) {
  var books;
  return regeneratorRuntime.async(function getbooks$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_bookUserModel["default"].find());
        case 3:
          books = _context5.sent;
          res.status(200).json(books);
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
};
exports.getbooks = getbooks;
//# sourceMappingURL=bookUserController.dev.js.map