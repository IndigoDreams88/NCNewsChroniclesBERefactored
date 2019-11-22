const connection = require("../db/connection");

function fetchUserByUsername(username) {
  // console.log("I am in the users model");
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .then(user => {
      // console.log(user);
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, username ${username} not found`
        });
      } else {
        return { user: user[0] };
      }
    });
}

module.exports = { fetchUserByUsername };
