const usersRouter = require("express").Router();
const {
  getAllUsers,
  getUserByUsername,
} = require("../controllers/users-controllers");
const { send405Error } = require("../error-handler/error-handler");

usersRouter.route("/all").get(getAllUsers).all(send405Error);

usersRouter.route("/:username").get(getUserByUsername).all(send405Error);

module.exports = usersRouter;
