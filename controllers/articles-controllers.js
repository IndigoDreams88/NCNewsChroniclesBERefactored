const {
  fetchArticlesById,
  updateVotes,
  createComment,
  fetchCommentsByArticleId,
  fetchAllArticles
} = require("../models/articles-models");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then(articles => {
      //console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  // console.log("I am in the update votes controller");
  // console.log(req.body);
  const { update } = req.body;
  const { article_id } = req.params;
  updateVotes(update, article_id)
    .then(updatedArticle => {
      //console.log(updatedArticle);
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  // console.log(req.body);
  const { username, body } = req.body;
  const { article_id } = req.params;
  // console.log(article_id);
  // console.log(username);
  // console.log(body);
  createComment(article_id, username, body)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { sortBy, order } = req.query;
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, sortBy, order)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic)
    .then(articles => {
      //console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(next);
};
