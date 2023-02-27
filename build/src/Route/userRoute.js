"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controller/userController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/signup', _userController.createUser);
router.post('/login', _userController.login);
router.get('/getAll', _userController.getAll);
router.put('/update/:id', _userController.updateUser);
router.delete('/delete/:id', _userController.deleteUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=userRoute.js.map