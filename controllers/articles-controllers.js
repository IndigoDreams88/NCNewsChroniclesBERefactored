const {
  fetchArticleById,
  updateVotes,
  createComment,
  fetchCommentsByArticleId,
  fetchAllArticles
} = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      //console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  // console.log("I am in the update votes controller");
  // console.log(req.body);
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  updateVotes(inc_votes, article_id)
    .then(article => {
      //console.log(article);
      res.status(200).send(article);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  // console.log(req.body);
  const { username, body } = req.body;
  const { article_id } = req.params;
  createComment(article_id, username, body)
    .then(comment => {
      res.status(201).send(comment);
      //console.log(comment);
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      //console.log(comments);
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then(([articles]) => {
      //console.log(articles);
      res.status(200).send(articles);
    })
    .catch(next);
};
