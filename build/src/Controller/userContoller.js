"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.login = exports.getAll = exports.deleteUser = exports.createUser = void 0;
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createUser = async (req, res) => {
  try {
    const salt = await _bcrypt.default.genSalt(10);
    const hashedpassword = await _bcrypt.default.hash(req.body.password, salt);
    const existingEmail = await _userModel.default.findOne({
      email: req.body.email
    });
    // Email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }
    if (existingEmail) {
      return res.status(409).json({
        message: 'Email  already exists'
      });
    } else {
      // Create a user
      const newUser = new _userModel.default({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedpassword
      });
      newUser.save().then(result => {
        return res.status(200).json({
          status: 'success',
          data: {
            user: newUser
          }
        });
      }).catch(error => {
        return res.status(500).json({
          error
        });
      });
    }
  } catch (err) {
    if (err.code === 'Cannot set headers after they are sent to the client') {
      console.error(err);
      return res.status(500).json({
        message: 'Unexpected error'
      });
    }
  }
};

// ===============================LOGIN==================================
exports.createUser = createUser;
const login = async (req, res) => {
  try {
    const user = await _userModel.default.findOne({
      email: req.body.email
    });
    const validated = await _bcrypt.default.compare(req.body.password, user.password);
    if (!(user && validated)) {
      return res.status(201).json("Invalid Email or Username!");
    } else {
      const token = _jsonwebtoken.default.sign({
        id: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      return res.status(200).json({
        message: "Logged in successfully",
        token: token
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ===============================GETALL USERS=============================
exports.login = login;
const getAll = (req, res) => {
  _userModel.default.find().then(users => {
    return res.send(users);
  }).catch(err => {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving user."
    });
  });
};

// ====================update==============================
exports.getAll = getAll;
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await _bcrypt.default.genSalt(10);
      req.body.password = await _bcrypt.default.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await _userModel.default.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      return res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can update  your account only!");
  }
};

// ===================delete user================================
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await _userModel.default.findById(req.params.id);
      await _userModel.default.findByIdAndDelete(req.params.id);
      return res.status(200).json("User has been deleted...");
    } catch (err) {
      return res.status(404).json("User not found!");
    }
  } else {
    return res.status(401).json("You can delete only your account!");
  }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userContoller.js.map