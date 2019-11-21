const { updateComments, removeComments } = require("../models/comments-models");

exports.patchComments = (req, res, next) => {
  //console.log("you are in the patch comments controller");
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateComments(inc_votes, comment_id)
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  removeComments(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
