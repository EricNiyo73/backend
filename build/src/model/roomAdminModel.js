"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const roomAdminSchema = new _mongoose.default.Schema({
  maxPeaples: {
    type: Number
  },
  roomNumbers: [{
    number: Number,
    unavailableDates: {
      type: [Date]
    }
  }]
});
var _default = _mongoose.default.model("RoomAdmin", roomAdminSchema);
exports.default = _default;
//# sourceMappingURL=roomAdminModel.js.map