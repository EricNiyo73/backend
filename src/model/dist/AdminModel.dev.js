"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bookAdminSchema = new _mongoose["default"].Schema({
  facilityTitle: {
    type: String,
    required: true
  },
  subFacility: {
    type: String
  },
  capacity: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  } // bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],

});

var _default = _mongoose["default"].model("bookAdmin", bookAdminSchema);

exports["default"] = _default;