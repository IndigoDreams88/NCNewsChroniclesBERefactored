const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("formats the created_at timestamp on the passed in array object to a JS Date for a single article object in an array", () => {
    const articlesArray = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const actualResults = formatDates(articlesArray);
    const expectedResults = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      }
    ];
    expect(actualResults).to.eql(expectedResults);
  });
  it("formats the created_at timestamp on the passed in array of objects to a JS Date for multiple article objects in an array", () => {
    const articlesArray = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      }
    ];
    const actualResults = formatDates(articlesArray);
    const expectedResults = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1471522072389)
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: new Date(1500584273256)
      },
      {
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: new Date(1500659650346)
      }
    ];
    expect(actualResults).to.eql(expectedResults);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object if passed an empty array", () => {
    const articlesArray = [];
    const actualResult = makeRefObj(articlesArray);
    const expectedResult = {};
    expect(actualResult).to.eql(expectedResult);
  });
  it("returns an array containing a single reference object", () => {
    const articlesArray = [
      {
        article_id: 1,
        title: "Running a Node App",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        votes: 0,
        topic: "coding",
        author: "jessjelly",
        created_at: 1471522072389
      }
    ];
    const actualResult = makeRefObj(articlesArray);
    const expectedResult = { "Running a Node App": 1 };
    expect(actualResult).to.eql(expectedResult);
  });
  it("returns an array of reference objects", () => {
    const articlesArray = [
      {
        article_id: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      },
      {
        article_id: 2,
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: "coding",
        author: "jessjelly",
        body:
          "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        created_at: 1500584273256
      },
      {
        article_id: 3,
        title: "22 Amazing open source React projects",
        topic: "coding",
        author: "happyamy2016",
        body:
          "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
        created_at: 1500659650346
      }
    ];
    const actualResult = makeRefObj(articlesArray);
    const expectedResult = {
      "Running a Node App": 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      "22 Amazing open source React projects": 3
    };
    expect(actualResult).to.eql(expectedResult);
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    const commentsArray = [];
    const articleRefObj = [{ "Running a Node App": 1 }];
    const actualResults = formatComments(commentsArray, articleRefObj);
    const expectedResults = [];
    expect(actualResults).to.eql(expectedResults);
  });
  it("returns an array of a single formatted comment object", () => {
    const commentsArray = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const articleRefObj = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 18
    };
    const actualResults = formatComments(commentsArray, articleRefObj);
    const expectedResults = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 18,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(actualResults).to.eql(expectedResults);
  });
  it("returns an array of formatted comment objects", () => {
    const articleRefObj = {
      "Running a Node App": 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
      "22 Amazing open source React projects": 3
    };
    const commentsArray = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        belongs_to: "Running a Node App",
        created_by: "weegembump",
        votes: 11,
        created_at: 1454293795551
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        belongs_to:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        created_by: "jessjelly",
        votes: -1,
        created_at: 1468655332950
      },
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        belongs_to: "22 Amazing open source React projects",
        created_by: "grumpy19",
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const actualResults = formatComments(commentsArray, articleRefObj);
    const expectedResults = [
      {
        body:
          "Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.",
        article_id: 1,
        author: "weegembump",
        votes: 11,
        created_at: new Date(1454293795551)
      },
      {
        body:
          "Est pariatur quis ipsa culpa unde temporibus et accusantium rerum. Consequatur in occaecati aut non similique aut quibusdam. Qui sunt magnam iure blanditiis. Et est non enim. Est ab vero dolor.",
        article_id: 2,
        author: "jessjelly",
        votes: -1,
        created_at: new Date(1468655332950)
      },
      {
        body:
          "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
        article_id: 3,
        author: "grumpy19",
        votes: 3,
        created_at: new Date(1504183900263)
      }
    ];
    expect(actualResults).to.eql(expectedResults);
  });
});
