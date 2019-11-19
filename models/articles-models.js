const connection = require("../db/connection");

function fetchArticlesById(article_id) {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`
        });
      } else {
        return { articles: articles };
      }
    });
}

function updateVotes(update, article_id) {
  // console.log("I am in the update votes model");
  // console.log(update);
  // console.log(article_id);
  return connection
    .select("articles.*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", update || 0)
    .returning("*")
    .then(articles => {
      //console.log(articles);
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`
        });
      } else {
        return { articles: articles };
      }
    });
}

function createComment(id, username, comment) {
  //console.log(id);
  return connection("comments")
    .insert({ article_id: id, author: username, body: comment })
    .returning("*")
    .then(comments => {
      // console.log(comments);
      return comments;
    });
}

/*
{ body: 'I am 100% sure that we\'re not completely sure.',
    belongs_to: 'UNCOVERED: catspiracy to bring down democracy',
    created_by: 'butter_bridge',
    votes: 1,
    created_at: 1069850163389 }

*/

module.exports = { fetchArticlesById, updateVotes, createComment };
