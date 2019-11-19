const {
  fetchArticlesById,
  updateVotes,
  createComment
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
  const { username, comment } = req.body;
  const { article_id } = req.params;
  // console.log(article_id);
  // console.log(username);
  // console.log(body);
  createComment(article_id, username, comment).then(postedComment => {
    res.status(201).send({ postedComment });
  });
};
