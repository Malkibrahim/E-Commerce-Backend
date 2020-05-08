const User = require("../Models/users");
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error("No authorization provided");
  const currentUser = await User.verifyToken(token);
  if (!currentUser) throw new Error("malformed data");
  req.user = currentUser;
  next();
};
