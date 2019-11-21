const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

//console.log(articleData);

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*");
      const usersInsertions = knex("users")
        .insert(userData)
        .returning("*");
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      // console.log(articleData);
      const formattedData = formatDates(articleData);
      return knex("articles")
        .insert(formattedData)
        .returning("*");
    })
    .then(articleRows => {
      //console.log(articleRows);
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      //console.log(commentData);
      return knex("comments").insert(formattedComments);
    });
};
//console.log(userData);
