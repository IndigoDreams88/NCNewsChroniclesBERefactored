const connection = require("../db/connection");

function fetchArticlesById(article_id) {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where({ "articles.article_id": article_id })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`
        });
      } else {
        return { article: article };
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
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, article id ${article_id} not found`
        });
      } else {
        return { article: article };
      }
    });
}

function createComment(id, username, body) {
  return connection("comments")
    .insert({ article_id: id, author: username, body: body })
    .returning("*")
    .then(comment => {
      return { comment: comment };
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
  //console.log(topic);
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
        const promises = [{ articles: articles }];
        // [
        //   articles,
        //   checkIfItemExists("users", { username: author || null }),
        //   checkIfItemExists("topics", { slug: topic || null })
        // ]
        // if topic isn't undefined (because someone put it in the url query) then push in the function call into the promises array
        // same thign for users

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
    .then(result => {
      if (result.length === 1) {
        return true;
      } else {
        return Promise.reject({
          status: 404,
          msg: "Error status 404, not found"
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
