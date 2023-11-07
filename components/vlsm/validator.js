const joi = require("@hapi/joi");

class Validator {
  constructor() {
    return this;
  }

  static create = joi.object().keys({
    uniqueId: joi.string().required()
  });

  static list = joi.object().keys();

  static sync = joi.object().keys({
    facilityId: joi.string().required(),
    lastUpdatedId: joi.string().required(),
    pendingIds: joi.array()
  });
}

module.exports = Validator;
