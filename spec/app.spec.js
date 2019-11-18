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
    it("GET:200 /api/topics - responds with an array", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an("array");
        });
    });
    it("GET:200 /api/topics - responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.have.keys(["slug", "description"]);
        });
    });
    it("GET:405 /api/topics - get topics, it responds with an error mesage if a request to use an invalid method is submitted", () => {
      const invalidMethods = ["patch", "put", "delete"];
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
});
