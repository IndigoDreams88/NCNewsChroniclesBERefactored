exports.formatDates = (list) => {
  const timestampToDate = list.map((article) => {
    const copiedArticle = { ...article };
    copiedArticle.created_at = new Date(article.created_at);
    return copiedArticle;
  });
  return timestampToDate;
};

exports.makeRefObj = (list) => {
  const referenceObjects = list.reduce((refObj, article) => {
    refObj[article.title] = article.article_id;
    return refObj;
  }, {});
  return referenceObjects;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map((comment) => {
    const edittedComments = {
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at),
    };
    return edittedComments;
  });
  return formattedComments;
};
