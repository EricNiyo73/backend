"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _roomUserController = require("../controller/roomUserController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
//CREATE
router.post("/createroom", _roomUserController.createRoom);

//UPDATE
router.put("/availability/:id", _roomUserController.updateRoomAvailability);
router.put("/:id", _roomUserController.updateRoom);
//DELETE
router.delete("/:id/:hotelid", _roomUserController.deleteRoom);
//GET ALL

router.get("/", _roomUserController.getRooms);
var _default = router;
exports.default = _default;
//# sourceMappingURL=roomUseRoute.js.map