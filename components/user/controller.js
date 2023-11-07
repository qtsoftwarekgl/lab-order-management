const BaseController = require("../base/controller");
const Service = require("./service");
const { responses } = require("../../libs/constants");

class Controller extends BaseController {
  constructor() {
    super();
    return this;
  }

  async signup(req, res) {
    const user = await new Service().signup(req, res);
    return user
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: user })
      : null;
  }
  async signin(req, res) {
    const user = await new Service().signin(req, res);
    return user
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: user })
      : null;
  }
}

module.exports = Controller;
