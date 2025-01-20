const passport = require("../config/passport");
const Workspace = require("../models/workspace-models");

const authenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user)
      return res.status(401).json({
        success: false,
        reason: 'NO_LOGIN',
        message: "權限不足: 使用者未登入",
      });

    req.user = user;
    next();
  })(req, res, next);
};

const workspaceAuthenticated = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { workspaceId } = req.params;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.userId": _id,
    });

    if (!workspace)
      return res.status(401).json({
        success: false,
        reason: 'NO_PERMISSION',
        message: "權限不足: 使用者不屬於此workspace會員",
      });

    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authenticated, workspaceAuthenticated };
