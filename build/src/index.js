"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _userRoute = _interopRequireDefault(require("./Route/userRoute.js"));
var _newsRoute = _interopRequireDefault(require("./Route/newsRoute.js"));
var _eventRoute = _interopRequireDefault(require("./Route/eventRoute.js"));
var _roomAdminRoute = _interopRequireDefault(require("./Route/roomAdminRoute.js"));
var _bookUseRoute = _interopRequireDefault(require("./Route/bookUseRoute.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const {
  PORT
} = process.env;
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
_mongoose.default.Promise = global.Promise;
_mongoose.default.set("strictQuery", true);
_mongoose.default.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Succesfully connected to the database");
}).catch(err => {
  console.log('something went wrong', err);
  process.exit();
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});

// routes
app.use('/user', _userRoute.default);
app.use('/news', _newsRoute.default);
app.use('/events', _eventRoute.default);
app.use('/admin', _roomAdminRoute.default);
app.use('/userbooking', bookUser);
app.get('/', (req, res) => {
  return res.json({
    message: "Welcome  I am testing again"
  });
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map