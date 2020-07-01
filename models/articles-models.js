const connection = require("../db/connection");

function fetchArticleById(article_id) {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`,
        });
      } else {
        return { article: article[0] };
      }
    });
}

function updateVotes(inc_votes, article_id) {
  return connection
    .select("articles.*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`,
        });
      } else {
        return { article: article[0] };
      }
    });
}

function createComment(id, username, body) {
  return connection("comments")
    .insert({ article_id: id, author: username, body: body })
    .returning("*")
    .then((comment) => {
      return { comment: comment[0] };
    });
}

function fetchCommentsByArticleId(article_id, sort_by, order) {
  return connection
    .select("*")
    .from("comments")
    .where({ "comments.article_id": article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*")
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.all([comments, checkIfExists(article_id)]);
      } else {
        return [comments];
      }
    })
    .then(([comments]) => {
      return { comments: comments };
    });
}

function checkIfExists(article_id) {
  return connection
    .select("*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .then((result) => {
      if (result.length === 1) {
        return true;
      } else {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`,
        });
      }
    });
}

function fetchAllArticles(sort_by, order, author, topic) {
  return connection("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .select("articles.*")
    .groupBy("articles.article_id")
    .count({ comment_count: "comment_id" })
    .orderBy(sort_by || "created_at", order || "desc")
    .modify((query) => {
      if (author) {
        query.where("articles.author", author);
      }
      if (topic) {
        query.where("topic", topic);
      }
    })
    .returning("*")
    .then((articles) => {
      if (articles.length === 0) {
        const promises = [{ articles: articles }];

        if (author !== undefined) {
          promises.push(checkIfItemExists("users", { username: author }));
        }
        if (topic !== undefined) {
          promises.push(checkIfItemExists("topics", { slug: topic }));
        }
        return Promise.all(promises);
      } else {
        return [{ articles: articles }];
      }
    });
}

function checkIfItemExists(table, item) {
  return connection
    .select("*")
    .from(table)
    .where(item)
    .then((result) => {
      if (result.length === 1) {
        return true;
      } else {
        return Promise.reject({
          status: 404,
          msg: "Error status 404, not found",
        });
      }
    });
}

module.exports = {
  fetchArticleById,
  updateVotes,
  createComment,
  fetchCommentsByArticleId,
  fetchAllArticles,
};
