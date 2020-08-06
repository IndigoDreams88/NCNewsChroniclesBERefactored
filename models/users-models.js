const connection = require("../db/connection");

function fetchAllUsers() {
  return connection
    .select("*")
    .from("users")
    .then((users) => {
      return users;
    });
}

function fetchUserByUsername(username) {
  return connection
    .select("*")
    .from("users")
    .where({ username })
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Error status 404, username ${username} not found`,
        });
      } else {
        return { user: user[0] };
      }
    });
}

module.exports = { fetchAllUsers, fetchUserByUsername };
