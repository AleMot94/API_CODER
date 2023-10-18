import SessionDTO from "../DAO/DTO/session.dto.js";

class SessionController {
  register(req, res) {
    req.session.user = {
      id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };
    return res.redirect("/profile");
  }

  login(req, res) {
    req.session.user = {
      id: req.user._id.toString(),
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };

    return res.redirect("/vista/products");
  }

  loginGithub(req, res) {
    //req.session.user = req.user;
    req.session.user = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: undefined,
      admin: req.user.admin,
      id: req.user._id.toString(),
    };
    res.redirect("/vista/products");
  }

  logout(req, res) {
    req.session.destroy((error) => {
      if (error) {
        return res.render("error-page", {
          msg: "error al querer cerrar session",
        });
      }
      res.send("logout success");
    });
    return res.redirect("/login");
  }

  current(req, res) {
    const session = req.session.user;
    const sessionDto = new SessionDTO(session);
    return res.status(200).json(sessionDto);
  }
}

export const sessionController = new SessionController();
