const { fetchUserByUsername } = require("../models/users-models");

exports.getUserByUsername = (req, res, next) => {
  // console.log("I am in the users controller");
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      // console.log(user);
      res.status(200).send({ user });
    })
    .catch(next);
};
