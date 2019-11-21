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
  return connection
    .select("articles.*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", update || 0)
    .returning("*")
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

function createComment(id, username, body) {
  return connection("comments")
    .insert({ article_id: id, author: username, body: body })
    .returning("*")
    .then(comments => {
      return { comments: comments };
    });
}

function fetchCommentsByArticleId(article_id, sortBy, order) {
  return connection
    .select("*")
    .from("comments")
    .where({ "comments.article_id": article_id })
    .orderBy(sortBy || "created_at", order || "desc")
    .returning("*")
    .then(comments => {
      if (comments.length === 0) {
        return Promise.all([comments, checkIfExists(article_id)]);
      } else {
        return { comments: comments };
      }
    });
}

// utils function
function checkIfExists(article_id) {
  return connection
    .select("*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .then(result => {
      if (result.length === 1) {
        return true;
      } else {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`
        });
      }
    });
}

// need to remove body and add comment count

function fetchAllArticles(sort_by, order, author, topic) {
  return connection("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .select("articles.*")
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) {
        query.where("articles.author", author);
      }
      if (topic) {
        query.where("topic", topic);
      }
    })
    .returning("*")
    .then(articles => {
      if (articles.length === 0) {
        return Promise.all([
          articles,
          checkIfItemExists("author", author),
          checkIfItemExists("topic", topic)
        ]);
      } else {
        return articles;
      }
    });
}

function checkIfItemExists(column, item) {
  // check if undefined, and if it is return true
  if (item === undefined) {
    return true;
  }
  return connection
    .select("*")
    .from("articles")
    .where({ [`articles.${column}`]: item })
    .then(result => {
      if (result.length === 1) {
        return true;
      } else {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, ${column} ${item} not found`
        });
      }
    });
}

module.exports = {
  fetchArticlesById,
  updateVotes,
  createComment,
  fetchCommentsByArticleId,
  fetchAllArticles
};
