const commentsRouter = require("express").Router();
const {
  patchComments,
  deleteComments
} = require("../controllers/comments-controllers");
const { send405Error } = require("../error-handler/error-handler");

commentsRouter
  .route("/:comment_id")
  .patch(patchComments)
  .delete(deleteComments)
  .all(send405Error);

module.exports = commentsRouter;
