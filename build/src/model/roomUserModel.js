"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const roomUserSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  roomNumbers: [{
    number: Number,
    unavailableDates: {
      type: [Date]
    }
  }]
}, {
  timestamps: true
});
var _default = _mongoose.default.model("RoomUser", roomUserSchema);
exports.default = _default;
//# sourceMappingURL=roomUserModel.js.map