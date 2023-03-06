"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.getAll = exports.login = exports.createUser = void 0;
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var createUser = function createUser(req, res) {
  var salt, hashedpassword, existingEmail, emailRegex, newUser;
  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));
        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));
        case 6:
          hashedpassword = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: req.body.email
          }));
        case 9:
          existingEmail = _context.sent;
          // Email validation using a regular expression
          emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (emailRegex.test(req.body.email)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email format'
          }));
        case 13:
          if (!existingEmail) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            message: 'Email  already exists'
          }));
        case 17:
          // Create a user
          newUser = new _userModel["default"]({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedpassword
          });
          newUser.save().then(function (result) {
            return res.status(200).json({
              status: 'success',
              data: {
                user: newUser
              }
            });
          })["catch"](function (error) {
            return res.status(500).json({
              error: error
            });
          });
        case 19:
          _context.next = 26;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0.code === 'Cannot set headers after they are sent to the client')) {
            _context.next = 26;
            break;
          }
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: 'Unexpected error'
          }));
        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}; // ===============================LOGIN==================================

exports.createUser = createUser;
var login = function login(req, res) {
  var user, validated, token;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: req.body.email
          }));
        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, user.password));
        case 6:
          validated = _context2.sent;
          if (user && validated) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(201).json("Invalid Email or Username!"));
        case 11:
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          return _context2.abrupt("return", res.status(200).json({
            message: "Logged in successfully",
            token: token
          }));
        case 13:
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json(_context2.t0));
        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // ===============================GETALL USERS=============================

exports.login = login;
var getAll = function getAll(req, res) {
  _userModel["default"].find().then(function (users) {
    return res.send(users);
  })["catch"](function (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving user."
    });
  });
}; // ====================update==============================

exports.getAll = getAll;
var updateUser = function updateUser(req, res) {
  var salt, updatedUser;
  return regeneratorRuntime.async(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.body.userId === req.params.id)) {
            _context3.next = 20;
            break;
          }
          if (!req.body.password) {
            _context3.next = 8;
            break;
          }
          _context3.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));
        case 4:
          salt = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));
        case 7:
          req.body.password = _context3.sent;
        case 8:
          _context3.prev = 8;
          _context3.next = 11;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            "new": true
          }));
        case 11:
          updatedUser = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(updatedUser));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](8);
          res.status(500).json(_context3.t0);
        case 18:
          _context3.next = 21;
          break;
        case 20:
          return _context3.abrupt("return", res.status(401).json("You can update  your account only!"));
        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 15]]);
}; // ===================delete user================================

exports.updateUser = updateUser;
var deleteUser = function deleteUser(req, res) {
  var user;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.body.userId === req.params.id)) {
            _context4.next = 15;
            break;
          }
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.params.id));
        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(_userModel["default"].findByIdAndDelete(req.params.id));
        case 7:
          return _context4.abrupt("return", res.status(200).json("User has been deleted..."));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(404).json("User not found!"));
        case 13:
          _context4.next = 16;
          break;
        case 15:
          return _context4.abrupt("return", res.status(401).json("You can delete only your account!"));
        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userContoller.dev.js.map