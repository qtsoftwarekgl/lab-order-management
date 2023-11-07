const joi = require("@hapi/joi");

class Validator {
  constructor() {
    return this;
  }

  static create = joi.object().keys({
    FOSAID: joi.string().required(),
    FacilityName: joi.string().required(),
    PatientID: joi.string().required(),
    TracnetID: joi.string().required(),
    PatientNames: joi.string().required(),
    SpecimenType: joi.string().required(),
    TestRequested: joi.string().required(),
    Laboratory: joi.string().required(),
    CollectionDate: joi.date().required()
  });

  static update = joi.object().keys({
    FOSAID: joi.string().required(),
    FacilityName: joi.string().required(),
    PatientID: joi.string().required(),
    TracnetID: joi.string().required(),
    PatientNames: joi.string().required(),
    SampleID: joi.string().required(),
    SpecimenType: joi.string().required(),
    TestRequested: joi.string().required(),
    Laboratory: joi.string().required(),
    CollectionDate: joi.date().required()
  });

  static list = joi.object().keys();

  static sync = joi.object().keys({
    fosaid: joi.string().required(),
    lastUpdatedId: joi.string().required(),
    pendingIds: joi.array()
  });
}

module.exports = Validator;
