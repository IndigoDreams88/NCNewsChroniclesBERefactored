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
          expect(body.topics).to.be.an("object");
          expect(body.topics.topics).to.be.an("array");
        });
    });
    it("GET:200 /api/topics - responds with an array of topic objects containing the keys: slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.topics[0]).to.have.keys(["slug", "description"]);
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
          // console.log(body);
          expect(body.user).to.be.an("object");
          expect(body.user.user).to.be.an("object");
        });
    });

    it("GET:200 /api/users/:username - responds with a user object containing the keys: username, avatar_url and name", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.user.user).to.have.keys([
            "username",
            "avatar_url",
            "name"
          ]);
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
    it("GET:200 /api/articles/:article_id - responds with an object with a key of articles, which has a value of an array", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          // console.log(body.articles);
          // console.log(body.articles.articles);
          expect(body.articles).to.be.an("object");
          expect(body.articles.articles).to.be.an("array");
        });
    });
    it("GET:200 /api/articles/:article_id - responds with an array of article objects each containing the keys: article_id, title, body, votes, topic, author and created_at", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          expect(body.articles.articles[0]).to.have.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
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
        .send({ update: 2 })
        .expect(200);
    });
    it("PATCH:200 /api/articles/:article_id - responds with the unchanged article object if no votes are sent", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.updatedArticle.articles[0]).to.eql({
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
        .send({ update: 2 })
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          expect(body.updatedArticle.articles[0]).to.eql({
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
        .send({ update: -10 })
        .expect(200)
        .then(({ body }) => {
          // console.log(body.updatedArticle.articles);
          expect(body.updatedArticle.articles[0]).to.eql({
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
        .send({ update: "banana" })
        .expect(400)
        .then(({ body }) => {
          // console.log(body);
          expect(body.msg).to.eql(' invalid input syntax for integer: "NaN"');
        });
    });
    it("PATCH:404 /api/articles/:article_id - responds with an error if passed a non existant id", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ update: 2 })
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
        .send({ username: "lurker", comment: "blah blah" })
        .expect(201);
    });
    it("POST:201 /api/articles/:article_id/comments - responds with the posted article, containing the relevant keys", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "lurker", comment: "blah blah" })
        .expect(201)
        .then(({ body }) => {
          //console.log(body);
          expect(body.postedComment[0]).to.have.keys([
            "author",
            "votes",
            "article_id",
            "comment_id",
            "body",
            "created_at"
          ]);
        });
    });
  });
});
