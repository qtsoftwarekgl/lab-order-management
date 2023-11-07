const express = require("express");
const router = express.Router();
const Controller = require("./controller");
const Validator = require("../base/validator");
const requestValidator = require("./validator");
const Authorization = require("../../middleware/authorization");
const controller = new Controller();
const validator = new Validator();

router
  .route("/order")
  .post(
    // validator.validateRequest.bind(
    //   new Validator().init(requestValidator.create)
    // ),
    controller.create.bind(controller)
  );

router
  .route("/findorder")
  .post(
    //validator.validateRequest.bind(new Validator().init(requestValidator.list)),
    controller.list.bind(controller)
  );

router
  .route("/update-result")
  .get(
    //validator.validateRequest.bind(new Validator().init(requestValidator.list)),
    controller.updateResult.bind(controller)
  );

router
  .route("/sync")
  .post(
    validator.validateRequest.bind(new Validator().init(requestValidator.sync)),
    controller.vlsmSync.bind(controller)
  );
  

module.exports = router;
