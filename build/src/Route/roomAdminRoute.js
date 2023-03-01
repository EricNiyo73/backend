"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _roomAdminController = require("../controller/roomAdminController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
//CREATE
router.post("/createroom", _roomAdminController.createRoom);

//UPDATE
router.put("/availability/:id", _roomAdminController.updateRoomAvailability);
router.put("/:id", _roomAdminController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", _roomAdminController.deleteRoom);
//GET ALL

router.get("/", _roomAdminController.getRooms);
var _default = router;
exports.default = _default;
//# sourceMappingURL=roomAdminRoute.js.map