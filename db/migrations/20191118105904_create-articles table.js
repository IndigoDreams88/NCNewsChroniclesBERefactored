exports.up = function(knex) {
  // console.log("creating articles table");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.string("body", 2000).notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .notNullable()
      .references("topics.slug")
      .onDelete("CASCADE");
    articlesTable
      .string("author")
      .notNullable()
      .references("users.username")
      .onDelete("CASCADE");
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  // console.log("dropping articles table");
  return knex.schema.dropTable("articles");
};
