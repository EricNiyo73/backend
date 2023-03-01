"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bookUserSchema = new _mongoose.default.Schema({
  facilities: [{
    facility: {
      type: String,
      required: true
    },
    subFacility: {
      type: String
    }
  }],
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  availability: [{
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      enum: ["Morning", "Afternoon", "Fullday"],
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
}

// bookNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
);
var _default = _mongoose.default.model("bookUser", bookUserSchema);
exports.default = _default;
//# sourceMappingURL=bookUserModel.js.map