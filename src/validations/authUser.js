export function authView(req, res, next) {
  if (req.session.user?.email) {
    return next();
  } else {
    return res
      .status(401)
      .render("error-page", { msg: "es necesario estar logeado" });
  }
}

export function authUserChat(req, res, next) {
  if (req.session.user?.email && req.session.user.admin == false) {
    return next();
  } else {
    return res.status(401).json({
      status: "error",
      msg: "only one user can access, not admin",
      payload: {},
    });
  }
}

export function authAdminView(req, res, next) {
  if (req.session.user.email && req.session.user.admin == true) {
    return next();
  }
  return res.status(403).render("error-page", { msg: "solo para admin" });
}

export function authUser(req, res, next) {
  if (req.session.user?.email && req.session.user.admin == false) {
    return next();
  } else {
    return res.status(401).json({
      status: "error",
      msg: "only one user can access, not admin",
      payload: {},
    });
  }
}

export function authAdmin(req, res, next) {
  if (req.session.user.email && req.session.user.admin == true) {
    return next();
  }
  return res.status(401).json({
    status: "error",
    msg: "only admin user can access",
    payload: {},
  });
}
