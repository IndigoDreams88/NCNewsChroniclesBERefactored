exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err);
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Error 405, method not allowed" });
};
