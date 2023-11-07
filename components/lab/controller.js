const BaseController = require("../base/controller");
const Service = require("./service");
const Labware = require("./labware");
const moment = require("moment");
const VlsmService = require("../vlsm/service");
const { responses } = require("../../libs/constants");


class Controller extends BaseController {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    const order = await new Service().create(req, res);
    return order
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
      : null;
  }

  async update(req, res) {
    const order = await new Service().update(req, res);
    return order
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
      : null;
  }

  async list(req, res) {
    const order = await new Service().findOrder(req, res);
    return order
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
      : null;
  }

  async findLatest(req, res) {
    const order = await new Service().findLatest(req, res);
    const vlsmOrder = await new VlsmService().findLatest(req, res);
    if (order && vlsmOrder) {
      if (moment(order.createdAt).isAfter(vlsmOrder.createdAt)) {
        order.DateSampleReceived = moment(order.DateSampleReceived).format('DD/MM/YYYY');
        order.SubmissionDate = moment(order.SubmissionDate).format('DD/MM/YYYY');
        order.DateOfTreatmentInitiation = moment(order.DateOfTreatmentInitiation).format('DD/MM/YYYY');
        order.DateOfInitiationOfCurrentRegimen = moment(order.DateOfInitiationOfCurrentRegimen).format('DD/MM/YYYY');
        order.TestDate = moment(order.TestDate).format('DD/MM/YYYY');
        return order
        ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
        : null;
      } else {
        vlsmOrder.sampleCollectionDate = moment(vlsmOrder.sampleCollectionDate).format('DD/MM/YYYY');
        vlsmOrder.sampleTestingDateAtLab = moment(vlsmOrder.sampleTestingDateAtLab).format('DD/MM/YYYY');
        vlsmOrder.sampleReceivedDate = moment(vlsmOrder.sampleReceivedDate).format('DD/MM/YYYY');
        vlsmOrder.dateOfArtInitiation = moment(vlsmOrder.dateOfArtInitiation).format('DD/MM/YYYY');
        vlsmOrder.reviewedOn = moment(vlsmOrder.reviewedOn).format('DD/MM/YYYY');
        vlsmOrder.rmTestingLastVLDate = moment(vlsmOrder.rmTestingLastVLDate).format('DD/MM/YYYY');
        vlsmOrder.requestDate = moment(vlsmOrder.requestDate).format('DD/MM/YYYY');
        return vlsmOrder
        ? this.sendResponse({ req, res, type: responses.SUCCESS, data: vlsmOrder })
        : null;
      }
    }
    if (order) {
      order.DateSampleReceived = moment(order.DateSampleReceived).format('DD/MM/YYYY');
      order.SubmissionDate = moment(order.SubmissionDate).format('DD/MM/YYYY');
      order.DateOfTreatmentInitiation = moment(order.DateOfTreatmentInitiation).format('DD/MM/YYYY');
      order.DateOfInitiationOfCurrentRegimen = moment(order.DateOfInitiationOfCurrentRegimen).format('DD/MM/YYYY');
      order.TestDate = moment(order.TestDate).format('DD/MM/YYYY');
      
      return order
        ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
        : null;
    } 
    if (vlsmOrder) {
      vlsmOrder.sampleCollectionDate = moment(vlsmOrder.sampleCollectionDate).format('DD/MM/YYYY');
      vlsmOrder.sampleTestingDateAtLab = moment(vlsmOrder.sampleTestingDateAtLab).format('DD/MM/YYYY');
      vlsmOrder.sampleReceivedDate = moment(vlsmOrder.sampleReceivedDate).format('DD/MM/YYYY');
      vlsmOrder.dateOfArtInitiation = moment(vlsmOrder.dateOfArtInitiation).format('DD/MM/YYYY');
      vlsmOrder.reviewedOn = moment(vlsmOrder.reviewedOn).format('DD/MM/YYYY');
      vlsmOrder.rmTestingLastVLDate = moment(vlsmOrder.rmTestingLastVLDate).format('DD/MM/YYYY');
      vlsmOrder.requestDate = moment(vlsmOrder.requestDate).format('DD/MM/YYYY');
      return vlsmOrder
        ? this.sendResponse({ req, res, type: responses.SUCCESS, data: vlsmOrder })
        : null;
    }

    return this.sendResponse({ req, res, type: responses.SUCCESS, data: {} });
  }

  async authentication(req, res) {
    const result = await new Labware().labwareAuthentication();
    return result
        ? this.sendResponse({ req, res, type: responses.SUCCESS, data: result })
        : null;
  }

  async labwareCreateUpdatePatient() {
    const result = await new Labware().labwareCreateUpdatePatient();
  }

  async labSync(req, res) {
    const result = await new Service().labSync(req, res);
    return result
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: result })
      : null;
  }
}

module.exports = Controller;
