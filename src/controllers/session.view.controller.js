class SessionViewController {
  renderLogin(req, res) {
    return res.render("login", {});
  }

  renderRegister(req, res) {
    return res.render("register", {});
  }

  renderProfile(req, res) {
    return res.render("profile", {});
  }

  renderSoloAdmin(req, res) {
    res.render("admin", {});
  }

  renderFailregister(req, res) {
    return res.render("error-page", {
      msg: "User already exists or empty fields",
    });
  }

  renderFaillogin(req, res) {
    return res.render("error-page", {
      msg: "non-existent username or invalid password",
    });
  }
}

export const sessionViewController = new SessionViewController();
