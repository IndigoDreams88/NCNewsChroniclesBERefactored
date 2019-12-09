process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const chai = require("chai");
const { expect } = chai;
chai.use(require("sams-chai-sorted"));
const request = require("supertest");
const app = require("../app");

describe("/api tests", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    connection.destroy();
  });
  it("DELETE:405 /api, returns an error message if a request to use an invalid method is sent", () => {
    const invalidMethods = ["delete"];
    const methodPromises = invalidMethods.map(method => {
      return request(app)
        [method]("/api")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Error 405, method not allowed");
        });
    });
  });

  describe("/topics tests", () => {
    it("GET:200 /api/topics - responds with a status of 200", () => {
      return request(app)
        .get("/api/topics")
        .expect(200);
    });
    it("GET:200 /api/topics - responds with an object with a key of topics, which has a value of an array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.be.an("object");
        });
    });
    it("GET:200 /api/topics - responds with an array of topic objects containing the keys: slug and description and the corresponding values", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.topics);
          expect(body.topics[0]).to.have.keys(["slug", "description"]);
          expect(body.topics[0]).to.eql({
            slug: "mitch",
            description: "The man, the Mitch, the legend"
          });
        });
    });
    it("GET:405 /api/topics - responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
  });
  describe("/users tests", () => {
    it("GET:200 /api/users/:username - responds with a status of 200", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200);
    });
    it("GET:200 /api/users/:username - responds with an object with a key of users, which has a value of an object", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.user).to.be.an("object");
        });
    });

    it("GET:200 /api/users/:username - responds with a user object containing the keys: username, avatar_url and name", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.user);
          expect(body.user).to.have.keys(["username", "avatar_url", "name"]);
        });
    });
    it("GET:404 /api/users/:username - responds with an error if passed a valid type of id but that does not exist", () => {
      return request(app)
        .get("/api/users/banana")
        .expect(404)
        .then(({ body }) => {
          //console.log(body);
          expect(body.msg).to.equal(
            "Error status 404, username banana not found"
          );
        });
    });
    it("GET:405 /api/users/:username - responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/users/lurker")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
  });
  describe("/articles tests", () => {
    it("GET:200 /api/articles/:article_id - responds with a status of 200", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200);
    });
    it("GET:200 /api/articles/:article_id - responds with an object with a key of articles", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an("object");
        });
    });
    it("GET:200 /api/articles/:article_id - responds with an article object containing the keys: article_id, title, body, votes, topic, author and created_at and the corresponding values", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          expect(body.article).to.have.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
          expect(body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13"
          });
        });
    });
    it("GET:400 /api/articles/:article_id - responds with an error if passed an invalid type of id", () => {
      return request(app)
        .get("/api/articles/banana")
        .expect(400)
        .then(({ body }) => {
          //console.log(body);
          expect(body.msg).to.eql(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    it("GET:404 /api/articles/:article_id - responds with an error if passed an valid type of id but that doesn't exist", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          //console.log(body);
          expect(body.msg).to.eql(
            "Error status 404, article id 9999 not found"
          );
        });
    });
    it("GET:405 /api/articles/:article_id - responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["post", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/1")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
    });
    it("PATCH:200 /api/articles/:article_id - responds with a status of 200", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 2 })
        .expect(200);
    });
    it("PATCH:200 /api/articles/:article_id - responds with the unchanged article object if no votes are sent", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });
    it("PATCH:200 /api/articles/:article_id - responds with the article object and the incremented votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 2 })
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 102,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });
    it("PATCH:200 /api/articles/:article_id - responds with the article object and the decremented votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 90,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });
    it("PATCH:400 /api/articles/:article_id - responds with an error if passed an invalid votes type", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "banana" })
        .expect(400)
        .then(({ body }) => {
          // console.log(body);
          expect(body.msg).to.eql(' invalid input syntax for integer: "NaN"');
        });
    });
    it("PATCH:404 /api/articles/:article_id - responds with an error if passed a non existant id", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ inc_votes: 2 })
        .expect(404)
        .then(({ body }) => {
          // console.log(body);
          expect(body.msg).to.eql(
            "Error status 404, article id 9999 not found"
          );
        });
    });
    it("POST:201 /api/articles/:article_id/comments - responds with a status of 201", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "lurker", body: "blah blah" })
        .expect(201);
    });
    it("POST:201 /api/articles/:article_id/comments - responds with the posted article, containing the keys: author, votes, article_id, comments_id, body, created_at with the corresponding values", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "lurker", body: "blah blah" })
        .expect(201)
        .then(({ body }) => {
          //console.log(body.comment[0]);
          expect(body.comment).to.have.keys([
            "author",
            "votes",
            "article_id",
            "comment_id",
            "body",
            "created_at"
          ]);
          expect(body.comment.author).to.equal("lurker");
          expect(body.comment.body).to.equal("blah blah");
        });
    });
    it("POST:400 /api/articles/:article_id/comments - it responds with an error if missing a required request property, i.e a body", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "lurker" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Error:400, Bad Request");
        });
    });
    it("POST:400 /api/articles/:article_id/comments -  it responds with an error if missing a required request property, i.e a username", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ body: "Blah, blah, blah" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal("Error:400, Bad Request");
        });
    });
    it("POST:400 /api/articles/:article_id/comments - it responds with an error if passed a valid username type, but that does not exist", () => {
      return request(app)
        .post("/api/articles/banana/comments")
        .send({ username: "badgersbadgers", body: "Blah, blah, blah" })
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    it("POST:404 /api/articles/:article_id/comments - it responds with an error if passed a valid article id, but that does not exist", () => {
      return request(app)
        .post("/api/articles/66666/comments")
        .send({ username: "lurker", body: "Blah, blah, blah" })
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Error article_id does not exist");
        });
    });
    it("POST:405 /api/articles/:article_id/comments - it responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/5/comments")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("GET:200 /api/articles/:article_id/comments - responds with a status of 200", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200);
    });
    it("GET:200 /api/articles/:article_id/comments - responds with an empty array if no comments exist for that article_id", () => {
      return request(app)
        .get("/api/articles/7/comments")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          expect(body.comments.length).to.eql(0);
        });
    });
    it("GET:200 /api/articles/:article_id/comments - responds with an array of comment objects, when comments exist for that article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.comments[0]);
          expect(body.comments[0]).to.be.an("object");
          expect(body.comments[0]).to.have.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
          expect(body.comments[0]).to.eql({
            comment_id: 2,
            author: "butter_bridge",
            article_id: 1,
            votes: 14,
            created_at: "2016-11-22T12:36:03.389Z",
            body:
              "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
          });
        });
    });
    it("GET:200 /api/articles/:article_id/comments - responds with an array of comment objects, sorted by default by created_at in descening order", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("GET:200 /api/articles/:article_id/comments - responds with an array of comment objects, sorted by default by votes in descending order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("votes");
        });
    });
    it("GET:200 /api/articles/:article_id/comments - responds with an array of comment objects, sorted by default by votes in descening order", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.ascendingBy("created_at");
        });
    });
    it("GET:400 /api/articles/:article_id/comments - responds with an error message if passed an invalid type of id", () => {
      return request(app)
        .get("/api/articles/banana/comments")
        .expect(400)
        .then(response => {
          expect(response.body.msg).to.equal(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    it("GET:404 /api/articles/:article_id/comments - responds with an error if passed a valid article id type, but that does not exist", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal(
            "Error status 404, article id 9999 not found"
          );
        });
    });
    it("GET:405 /api/articles/:article_id/comments - responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/5/comments")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("GET:200 /api/articles - responds with a status of 200", () => {
      return request(app)
        .get("/api/articles")
        .expect(200);
    });
    it("GET:200 /api/articles - responds with an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          //console.log(body.articles);
          //console.log(body.articles[0]);
          expect(body.articles).to.be.an("array");
          expect(body.articles[0]).to.contain.keys([
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
    it("GET:200 /api/articles - responds with an array of article objects sorted by default by created_at in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          //console.log(articles[0].created_at)
          expect(articles).to.be.descendingBy("created_at");
        });
    });
    it("GET:200 /api/articles - responds with an array of article objects, sorted by the passed in query of title, and the passed in order of ascending", () => {
      return request(app)
        .get("/api/articles?sort_by=title&&order=asc")
        .expect(200)
        .then(({ body: { articles } }) => {
          //console.log(articles[0].created_at)
          expect(articles).to.be.ascendingBy("title");
        });
    });
    it("GET:200 /api/articles - responds with an array of articles sorted by the passed in author/username", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          //console.log(articles);
          expect(articles).to.be.descendingBy("author");
        });
    });
    it("GET:200 /api/articles - responds with an array of articles sorted by the passed in topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body: { articles } }) => {
          // console.log(articles[0]);
          expect(articles).to.be.descendingBy("topic");
        });
    });
    it("GET:200 /api/articles - responds with an array of articles sorted by the passed in topic in descending order", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body: { articles } }) => {
          // console.log(articles[0]);
          expect(articles).to.be.descendingBy("topic");
        });
    });
    it("GET:200 /api/articles - responds with an empty array ", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(({ body: { articles } }) => {
          //console.log(articles);
          expect(articles.length).to.eql(0);
        });
    });
    it("GET:400 /api/articles - responds with an an error message if an invalid column is passed into the sort_by query", () => {
      return request(app)
        .get("/api/articles?sort_by=banana")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal(' column "banana" does not exist');
        });
    });

    it("GET:404 /api/articles - responds with an error status 404 and a messsage when provided a none existant author ", () => {
      return request(app)
        .get("/api/articles?author=wallace")
        .expect(404)
        .then(({ body: { msg } }) => {
          // console.log(articles[0]);
          expect(msg).to.equal("Error status 404, not found");
        });
    });
    it("GET:404 /api/articles - responds with an error status 404 and a messsage when provided a none existant topic ", () => {
      return request(app)
        .get("/api/articles?topic=jinglejangle")
        .expect(404)
        .then(({ body: { msg } }) => {
          // console.log(articles[0]);
          expect(msg).to.equal("Error status 404, not found");
        });
    });
    it("GET:405 /api/articles - responds with an error message if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["post", "patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/comments tests", () => {
    it("PATCH:200 /api/comments/:comment_id responds with a status of 200", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 4 })
        .expect(200);
    });

    it("PATCH:200 /api/comments/:comment_id responds with the updated comment, with the keys: body, votes, created_at, author, article_id and comment_id and corresponding values", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 4 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.comments[0]);
          expect(body.comment).to.have.keys([
            "body",
            "votes",
            "created_at",
            "author",
            "article_id",
            "comment_id"
          ]);
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 20,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("PATCH:200 /api/comments/:comment_id responds the unchanged comment if no votes are added", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 16,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("PATCH:200 /api/comments/:comment_id responds with the comment and the incremented votes when a positive integer is passed", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 12 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 28,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("PATCH:200 /api/comments/:comment_id responds with the comment and the decremented votes when a negative integer is passed", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -12 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 4,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("PATCH:400 /api/comments/:comment_id responds with an error if an invalid votes type is passed", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "leprechaun" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql(' invalid input syntax for integer: "NaN"');
        });
    });
    it("PATCH:400 /api/comments/:comment_id responds with an error if an invalid votes type is passed", () => {
      return request(app)
        .patch("/api/comments/banana")
        .send({ inc_votes: 7 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.eql(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    it("PATCH:404 /api/comments/:comment_id responds with an error if an invalid votes type is passed", () => {
      return request(app)
        .patch("/api/comments/9999")
        .send({ inc_votes: 7 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.eql(
            "Error status 404, comment id 9999 not found"
          );
        });
    });
    it("PATCH:405 /api/comments/:comment_id responds with an error message if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["post"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/comments/9999")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Error 405, method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    it("DELETE:204 /api/comments/:comment_id responds with a status of 204", () => {
      return request(app)
        .delete("/api/comments/3")
        .expect(204);
    });
    it("DELETE:400 /api/comments/:comment_id responds with an error if passed an invalid id type", () => {
      return request(app)
        .delete("/api/comments/banana")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            ' invalid input syntax for integer: "banana"'
          );
        });
    });
    it("DELETE:404 /api/comments/:comment_id responds with an error if passed a valid  type of id but that does not exist", () => {
      return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal(
            "Error status 404, comment id 9999 not found"
          );
        });
    });
  });
});
