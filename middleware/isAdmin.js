module.exports = async (req, res, next) =>
  req.user.isAdmin
    ? next()
    : res.status(403).send("This action requires adnin priviledges!!");

// 401 - Unauthorized
// 403 - Forbidden
