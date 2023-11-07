const express = require("express");
const fs = require("fs");
const router = express.Router();
const Controller = require("./base/controller");
const Constant = require("../libs/constants");
const responses = Constant.responses;
const cron = require('node-cron');
const VlsmController = require('./vlsm/controller')

router.get("/", (req, res) =>
  new Controller().sendResponse({
    req,
    res,
    type: responses.SUCCESS,
    data: "Lab_order_management_apis is running...",
  })
);

fs.readdir(__dirname, function (err, components) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  components.forEach(function (component) {
    try {
      if (fs.existsSync(`${__dirname}/${component}/router.js`)) {
        router.use(
          `/${component}`.toLowerCase(),
          require(`./${component}/router`)
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  });
});

const cronHandler = cron.schedule(`* */${process.env.CRON_INTERVAL} * * *`, () => {
  console.log(`Cron running a task for every ${process.env.CRON_INTERVAL} ....`);
  new VlsmController().updateResult();
});
cronHandler.start();

module.exports = router;
