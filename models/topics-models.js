const connection = require("../db/connection");

function fetchTopics() {
  return connection
    .select("*")
    .from("topics")
    .then(topics => {
      return { topics: topics };
    });
}

module.exports = { fetchTopics };
