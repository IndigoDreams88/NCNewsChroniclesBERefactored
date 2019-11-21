const connection = require("../db/connection");

function updateComments(inc_votes, comment_id) {
  //console.log("you are in the update comments model");
  return connection
    .select("comments.*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then(comment => {
      //console.log(comments);
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, comment id ${comment_id} not found`
        });
      } else {
        return { comment: comment };
      }
    });
}

function removeComments(comment_id) {
  return connection
    .select("comments.*")
    .from("comments")
    .where("comment_id", comment_id)
    .delete()
    .then(response => {
      // console.log(response);
      if (response === 1) {
        return true;
      } else if (response === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, comment id ${comment_id} not found`
        });
      }
    });
}

module.exports = { updateComments, removeComments };
