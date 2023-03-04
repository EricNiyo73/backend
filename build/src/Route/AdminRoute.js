"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AdminController = require("../Controller/AdminController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
//CREATE
router.post("/create", _AdminController.upload.single("image"), _AdminController.createfacility);

//UPDATE
router.put("/:id", _AdminController.updatefacility);
//DELETE
router.delete("/:id", _AdminController.deletefacility);
//GET ALL
router.get("/:id", _AdminController.getfacilit);
router.get("/", _AdminController.getfacility);
// appove
router.patch('/booking-requests/:id', _AdminController.bookrequest);
var _default = router;
exports.default = _default;
//# sourceMappingURL=AdminRoute.js.map