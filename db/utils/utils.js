exports.formatDates = list => {
  //console.log(list);
  const timestampToDate = list.map(article => {
    const copiedArticle = { ...article };
    copiedArticle.created_at = new Date(article.created_at);
    return copiedArticle;
  });
  return timestampToDate;
};

exports.makeRefObj = list => {
  const referenceObjects = list.reduce((refObj, article) => {
    //console.log(article.article_id);
    // console.log(article.title);
    //console.log(refObj);
    //console.log(article);
    refObj[article.title] = article.article_id;
    return refObj;
  }, {});
  //console.log(referenceObjects);
  return referenceObjects;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = comments.map(comment => {
    const edittedComments = {
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at)
    };
    return edittedComments;
  });
  return formattedComments;
};
