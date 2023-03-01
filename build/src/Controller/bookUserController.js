"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatebookAvailability = exports.updatebook = exports.getbooks = exports.getbook = exports.deletebook = exports.createbooking = void 0;
var _bookUserModel = _interopRequireDefault(require("../model/bookUserModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// ==================creation of availability book===========
const createbooking = async (req, res, date, time, capacity) => {
  try {
    _bookUserModel.default.findOne({
      'availability.date': date,
      'availability.time': time,
      'availability.isAvailable': true
    }, (err, bookuser) => {
      if (err) {
        return res.status(500).json("there is an error");
      } else if (!bookuser) {
        return res.status(401).json("No available booking for the specified date and time");
      } else {
        // create a new booking
        const booking = new _bookUserModel.default(req.body);
        booking.save();
        return res.status(200).json({
          message: "success",
          booking
        });
      }
    });
  } catch (err) {
    next(err);
  }
  // const newbook = new book(req.body);

  // try {
  //   const savedbook = await newbook.save();
  //   res.status(200).json(savedbook);
  // } catch (err) {
  //   next(err);
  // }
};

// ==================update book==========================
exports.createbooking = createbooking;
const updatebook = async (req, res, next) => {
  try {
    const updatedbook = await _bookUserModel.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    res.status(200).json(updatedbook);
  } catch (err) {
    next(err);
  }
};

//   =======================update availability=========================
exports.updatebook = updatebook;
const updatebookAvailability = async (req, res, next) => {
  try {
    await _bookUserModel.default.updateOne({
      "bookNumbers._id": req.params.id
    }, {
      $push: {
        "bookNumbers.$.unavailableDates": req.body.dates
      }
    });
    res.status(200).json("book status has been updated.");
  } catch (err) {
    next(err);
  }
};

//   ==============================delete ==========================
exports.updatebookAvailability = updatebookAvailability;
const deletebook = async (req, res, next) => {
  try {
    await _bookUserModel.default.findByIdAndDelete(req.params.id);
    res.status(200).json("book has been deleted.");
  } catch (err) {
    next(err);
  }
};

//   ==============================get one book================================
exports.deletebook = deletebook;
const getbook = async (req, res, next) => {
  try {
    const book = await book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};
//   ==========================get books availability==========================
exports.getbook = getbook;
const getbooks = async (req, res, next) => {
  try {
    const books = await _bookUserModel.default.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
exports.getbooks = getbooks;
//# sourceMappingURL=bookUserController.js.map