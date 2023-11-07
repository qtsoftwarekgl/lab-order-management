const express = require("express");
const router = express.Router();
const Controller = require("./controller");
const Validator = require("../base/validator");
const requestValidator = require("./validator");

const controller = new Controller();
const validator = new Validator();

router
  .route("/signup")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signup)
    ),
    controller.signup.bind(controller)
  );

router
  .route("/signin")
  .post(
    validator.validateRequest.bind(
      new Validator().init(requestValidator.signin)
    ),
    controller.signin.bind(controller)
  );

module.exports = router;
