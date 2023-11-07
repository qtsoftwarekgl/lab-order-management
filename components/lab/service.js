const Controller = require("../base/controller");
const Schema = require("./schema");
const Labware = require("./labware");
const { responses } = require("../../libs/constants");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require("moment");
const _ = require('lodash');
const Utils = require('../../helpers/utils');

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    const data = req.body;
    const formatData = {
      SampleID: data.SampleID ? data.SampleID : "",
      SampleBarcode: data.SampleBarcode ? data.SampleBarcode : "",
      PatientID: data.PatientID ? data.PatientID : "",
      TracnetID: data.TracnetID ? data.TracnetID : "",
      PatientNames: data.PatientNames ? data.PatientNames : "",
      lastName: data.lastName ? data.lastName : "",
      Gender: data.Gender ? data.Gender : "",
      PhoneNumber: data.PhoneNumber ? data.PhoneNumber : "",
      RevisionNumber: data.RevisionNumber ? data.RevisionNumber : "",
      patientAge: data.patientAge ? data.patientAge : "",
      birthDate: data.birthDate ? data.birthDate : null,
      FOSAID: data.FOSAID ? data.FOSAID : "",
      CollectionDate: data.CollectionDate ? data.CollectionDate : null,
      DateSampleReceived: data.DateSampleReceived ? data.DateSampleReceived : null,
      SubmissionDate: data.SubmissionDate ? data.SubmissionDate : null,
      SourceOfFunding: data.SourceOfFunding ? data.SourceOfFunding : "",
      PurposeOfTest: data.PurposeOfTest ? data.PurposeOfTest : "",
      DateOfTreatmentInitiation: data.DateOfTreatmentInitiation ? data.DateOfTreatmentInitiation : null,
      CurrentRegimen: data.CurrentRegimen ? data.CurrentRegimen : "",
      DateOfInitiationOfCurrentRegimen: data.DateOfInitiationOfCurrentRegimen ? data.DateOfInitiationOfCurrentRegimen : null,
      ARVAdherence: data.ARVAdherence ? data.ARVAdherence : "",
      IndicationForViralLoadTesting: data.IndicationForViralLoadTesting ? data.IndicationForViralLoadTesting : "",
      PTMECode: data.PTMECode ? data.PTMECode : "",
      MRN: data.MRN ? data.MRN : "",
      TestDate: data.TestDate ? data.TestDate : null,
      Laboratory: data.Laboratory ? data.Laboratory : "",
      FacilityName: data.FacilityName ? data.FacilityName : "",
      TestedBy: data.TestedBy ? data.TestedBy : "",
      ApprovedBy: data.ApprovedBy ? data.ApprovedBy : "",
      SpecimenType: data.SpecimenType ? data.SpecimenType : "",
      TestName: data.TestName ? data.TestName : "",
      TestRequested: data.TestRequested ? data.TestRequested : "",
      Results: data.Results ? data.Results : {},
      createdAt: new Utils().getCurrentDateAndTime(),
      updatedAt: new Utils().getCurrentDateAndTime()
    }
    try {
      const order = new Schema({ ...formatData });
      const orderRes = await order.save();
      formatData.LabOrderID = orderRes.id
      await new Labware().labwareCreateUpdatePatient(formatData);
      return orderRes;
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async update(req, res) {
    const data = req.body;
    const {dataValues} = await Schema.findOne({ where: {
      id: parseInt(data.LabOrderID)
    } });
    console.log("dataValues", dataValues)
    const formatData = {
      SampleID: data.SampleID ? data.SampleID : dataValues.SampleID,
      SampleBarcode: data.SampleBarcode ? data.SampleBarcode : dataValues.SampleBarcode,
      PatientID: data.PatientID ? data.PatientID : dataValues.PatientID,
      TracnetID: data.TracnetID ? data.TracnetID : dataValues.TracnetID,
      PatientNames: data.PatientNames ? data.PatientNames : dataValues.PatientNames,
      lastName: data.lastName ? data.lastName : dataValues.lastName,
      Gender: data.Gender ? data.Gender : dataValues.Gender,
      PhoneNumber: data.PhoneNumber ? data.PhoneNumber : dataValues.PhoneNumber,
      RevisionNumber: data.RevisionNumber ? data.RevisionNumber : dataValues.RevisionNumber,
      patientAge: data.patientAge ? data.patientAge : dataValues.patientAge,
      birthDate: data.birthDate ? dataValues.birthDate : null,
      FOSAID: data.FOSAID ? data.FOSAID : dataValues.FOSAID,
      CollectionDate: data.CollectionDate ? data.CollectionDate : dataValues.CollectionDate,
      DateSampleReceived: data.DateSampleReceived ? data.DateSampleReceived : dataValues.DateSampleReceived,
      SubmissionDate: data.SubmissionDate ? data.SubmissionDate : dataValues.SubmissionDate,
      SourceOfFunding: data.SourceOfFunding ? data.SourceOfFunding : dataValues.SourceOfFunding,
      PurposeOfTest: data.PurposeOfTest ? data.PurposeOfTest : dataValues.PurposeOfTest,
      DateOfTreatmentInitiation: data.DateOfTreatmentInitiation ? data.DateOfTreatmentInitiation : dataValues.DateOfTreatmentInitiation,
      CurrentRegimen: data.CurrentRegimen ? data.CurrentRegimen : dataValues.CurrentRegimen,
      DateOfInitiationOfCurrentRegimen: data.DateOfInitiationOfCurrentRegimen ? data.DateOfInitiationOfCurrentRegimen : dataValues.DateOfInitiationOfCurrentRegimen,
      ARVAdherence: data.ARVAdherence ? data.ARVAdherence : dataValues.ARVAdherence,
      IndicationForViralLoadTesting: data.IndicationForViralLoadTesting ? data.IndicationForViralLoadTesting : dataValues.DateOfInitiationOfCurrentRegimen,
      PTMECode: data.PTMECode ? data.PTMECode : dataValues.PTMECode,
      MRN: data.MRN ? data.MRN : dataValues.MRN,
      TestDate: data.TestDate ? data.TestDate : dataValues.TestDate,
      Laboratory: data.Laboratory ? data.Laboratory : dataValues.Laboratory,
      FacilityName: data.FacilityName ? data.FacilityName : dataValues.FacilityName,
      TestedBy: data.TestedBy ? data.TestedBy : dataValues.TestedBy,
      ApprovedBy: data.ApprovedBy ? data.ApprovedBy : dataValues.ApprovedBy,
      SpecimenType: data.SpecimenType ? data.SpecimenType : dataValues.SpecimenType,
      TestName: data.TestName ? data.TestName : dataValues.TestName,
      TestRequested: data.TestRequested ? data.TestRequested : dataValues.TestRequested,
      Results: data.Results ? data.Results : dataValues.Results,
      Sync: data.sync ? data.sync : '0',
      updatedAt: new Utils().getCurrentDateAndTime()
    }
    try {
      const result = await Schema.update({...formatData}, {
        where: {
          id: parseInt(data.LabOrderID)
        }
      });
      return result
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async findOrder(req, res) {
    try {
      const { fosaid, patientid, sampleid, patientnames,testdate,tracnetid, testname, datefrom, dateto, page, size } = req.query;
      if (
        fosaid == undefined &&
        patientid == undefined &&
        sampleid == undefined &&
        patientnames == undefined &&
        testdate == undefined &&
        tracnetid == undefined
      ) {
        throw new Error(responses.BAD_REQUEST.MSG);
      }

      let whereQuery = {};
      if (fosaid) {
        whereQuery.fosaid = fosaid;
      }
      if (patientid) {
        whereQuery.patientid = patientid;
      }
      if (sampleid) {
        whereQuery.sampleid = sampleid;
      }
      if (patientnames) {
        whereQuery.patientnames = patientnames;
      }
      if (testdate) {
        whereQuery.testdate = testdate;
      }
      if (tracnetid) {
        whereQuery.tracnetid = tracnetid;
      }
      if (testname) {
        whereQuery.specimentype = { [Op.like]: `%${testname}%` };
      }
      if (datefrom || dateto) {
        let dateFrom = datefrom ? moment.utc(datefrom).startOf('day').format() : '';
        let dateTo = dateto ? moment.utc(dateto).endOf('day').format() : '';
        if (datefrom && dateto) {
          whereQuery.testdate = { [Op.and]: [{[Op.gte]: dateFrom}, {[Op.lte]: dateTo}] };
        } else if (datefrom && !dateto) {
          whereQuery.testdate = { [Op.gte]: dateFrom };
        } else if (!datefrom && dateto) {
          whereQuery.testdate = { [Op.lte]: dateTo };
        }
      }
      const pagination = this.getPagination(page, size);
      const order = await Schema.findAll({ limit: pagination.limit, offset: pagination.offset, where: whereQuery});
      if (!order) {
        throw new Error(responses.RESOURCE_NOT_FOUND.MSG);
      }
      return order;
    } catch (error) {
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      if (error.message === responses.RESOURCE_NOT_FOUND.MSG) {
        responseType = responses.RESOURCE_NOT_FOUND;
      } else if (error.message === responses.BAD_REQUEST.MSG) {
        responseType = responses.BAD_REQUEST;
        responseType.MSG =
          "You must specify the FOSAID or PatientID or SampleID or PatientNames or TestDate or TracnetID ";
      }

      this.sendResponse({ req, res, type: responseType });
    }
  }
  getPagination (page, size){
    const limit = size ? +size : 100;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };
  async findLatest(req, res) {
    try {
      const { patientid } = req.query;

      if (
        patientid == undefined
      ) {
        throw new Error(responses.BAD_REQUEST.MSG);
      }

      let whereQuery = {};
      if (patientid) {
        whereQuery.patientid = patientid;
      }

      const order = await Schema.findOne({ where: whereQuery, order: [ [ 'createdAt', 'DESC' ]] });

      if (!order) {
        throw new Error(responses.RESOURCE_NOT_FOUND.MSG);
      }
      return order;
    } catch (error) {
      return null;
    }
  }

  async labSync(req, res) {
    const { fosaid, lastUpdatedId, pendingIds } = req.body;
    if (!fosaid || !lastUpdatedId) {
      throw new Error(responses.BAD_REQUEST.MSG);
    }
    let list = [];
    let existingOrders = [];
    if (pendingIds.length) {
      const resultsPendingFromExistList = { fosaid: fosaid, id: pendingIds};
      let arr = await Schema.findAll({where: resultsPendingFromExistList});
      if (arr.length) {
        arr.map(
          (item) => {
            if (!_.isEmpty(item.Results)) {
              existingOrders.push(item)
            }
          }
        )
      }
    }

    const newOrdersQuery = { fosaid: fosaid, id: {[Op.gt]: lastUpdatedId} };
    let newOrders = await Schema.findAll({where: newOrdersQuery});
    list = [...existingOrders, ...newOrders]
    return list;
  }
}

module.exports = Service;
