class VistaController {
  renderLogin(req, res) {
    return res.render("login", {});
  }
}

export const vistaController = new VistaController();
