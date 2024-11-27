const authAdmin = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("admin is not authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyqwez";
  const isuserLoggined = token === "xyz";
  if (!isuserLoggined) {
    res.status(401).send("user has not been loggined");
  } else {
    next();
  }
};  

module.exports = {
  authAdmin,
  userAuth
};
