const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

// console.log(
//   commentData.filter((comment) => {
//     return (
//       comment.body ===
//       "Nihil laborum qui quidem quibusdam aut deserunt laboriosam. Enim ipsa corporis. Nobis ipsa deleniti natus nulla qui ut vero sequi. Perferendis eveniet eligendi est itaque repellat. Illum hic nesciunt omnis veniam recusandae architecto et. Cumque qui mollitia ipsam impedit nemo."
//     );
//   })
// );

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData).returning("*");
      const usersInsertions = knex("users").insert(userData).returning("*");
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedData = formatDates(articleData);
      return knex("articles").insert(formattedData).returning("*");
    })
    .then((articleRows) => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      console.log(
        formattedComments.filter((comment) => {
          return !comment.article_id;
          //"2017-05-06T21:33:02.394Z";
          //2017-04-10T19:15:58.614Z
          // 2016-06-04T18:00:17.326Z
        })
      );
      return knex("comments").insert(formattedComments);
    });
};
