const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchVotes,
  postComment,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles-controllers");
const { send405Error } = require("../error-handler/error-handler");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(send405Error);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotes)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(send405Error);

module.exports = articlesRouter;
