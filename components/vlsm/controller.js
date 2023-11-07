const BaseController = require("../base/controller");
const Service = require("./service");
const { responses, VlsmOrderPayload } = require("../../libs/constants");
const API = require("../../config/axios");
const { v4: uuidv4 } = require('uuid');
const shortid = require('shortid');
const { VlsmUser } = require('./schema');
const Utils = require('../../helpers/utils');
const _ = require('lodash');
const fs = require('fs');
const log_file = fs.createWriteStream('updateVlsmOrdersLogs.log', { flags: 'w' });
const VlsmUserSchema = require('./vlsmUserSchema')
const axios = require('axios').default;
const Constant = require('../../libs/constants')

class Controller extends BaseController {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    const actualPayload = _.cloneDeep(_.isArray(req.body) ? req.body : [req.body]);
    const payload = {
      "appVersion": process.env.VLSM_API_VERSION,
      data: _.isArray(req.body) ? req.body : [req.body]
    }
    if (!payload.data[0].patientId || payload.data[0].patientId === "") {
      return this.sendResponse({ req, res, type: responses.BAD_REQUEST, data: {} })
    }
    payload.data.forEach(
      order => {
        //order.uniqueId = uuidv4();
        order.appSampleCode = shortid.generate();
        delete order.patientId;
      }
    );
    let response = await this.sendVlsmOrderCreateResponse(payload);
    response = (_.isEmpty(response) || !response) ? await this.sendVlsmOrderCreateResponse(payload) : response;
    if (response && response.data && response.data[0].status === 'success') {
      const resData = response.data
      payload.data = actualPayload;
      payload.data[0].sampleCode = resData[0].sampleCode
      payload.data[0].appSampleCode = resData[0].appSampleCode
      payload.data[0].uniqueId = resData[0].uniqueId
      const order = await new Service().create(payload, res);
      return this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
    } else {
      return null
    }
  }

  async sendVlsmOrderCreateResponse(data) {
    let res = {};
    const clonedPayload = _.cloneDeep(data);
    if (data.data[0] && data.data[0].patientId) {
      delete data.data[0].patientId;
    }
    await API.post(`${responses.VLSM_URL}/vl/save-request.php`, data)
      .then(
        async (response) => {
          res.data = response.data;
          let encounterId = new Utils().generateShrId()
          await this.sendEncounterToShr({ id: encounterId, upid: data.data[0].upid, patientInfoTodisplay: data.data[0].patientInfoTodisplay, participant: data.data[0].participant })
          await this.sendServiceRequestToShr({ shrEncounter: encounterId, upid: data.data[0].upid, patientInfoTodisplay: data.data[0].patientInfoTodisplay })
        }
      )
      .catch(
        async (err) => {
          if (err.response && err.response.status === 401) {
            const updateToken = await VlsmUserSchema.update({ token: '' }, {
              where: {
                username: process.env.VLSM_USERNAME
              }
            });
            const vlsmTokenUpdate = await new Utils().getAuthToken();
            if (vlsmTokenUpdate) {
              await new Controller().sendVlsmOrderCreateResponse(clonedPayload);
            }
          }
        }
      );
    return res;
  }

  async sendEncounterToShr({ id, upid, patientInfoTodisplay, participant, period }) {
    let shrEncounter = Constant.shrEncounter;
    shrEncounter.id = id;
    shrEncounter.contained[0].recorded = new Date().toISOString();
    shrEncounter.subject.identifier.value = upid;
    shrEncounter.subject.display = patientInfoTodisplay;
    shrEncounter.participant[0].display = participant;
    shrEncounter.period = period ? period : new Date().toISOString();

    axios({
      method: 'post',
      url: `${process.env.SHR_URL}/shr/Encounter`,
      data: shrEncounter
    }).then(
      (response) => {
        console.log("====================================================================")
        console.log("============== pushing Encouter to Shr successfull =================")
        console.log("====================================================================")
      }
    )
      .catch((error) => {
        console.log("===================================================================")
        console.log("==============Failed to pushed Encounter to shr====================")
        console.log("===================================================================")
      });
  }

  async sendServiceRequestToShr({ shrEncounter, upid, patientInfoTodisplay }) {
    let shrServiceRequest = Constant.shrServiceRequest;

    shrServiceRequest.id = new Utils().generateShrId()
    shrServiceRequest.code = {}
    shrServiceRequest.subject.reference = "";
    shrServiceRequest.subject.identifier.value = upid;
    shrServiceRequest.subject.display = patientInfoTodisplay;
    shrServiceRequest.encounter.reference = `Encounter/${shrEncounter}`;

    axios({
      method: 'post',
      url: `${process.env.SHR_URL}/shr/ServiceRequest`,
      data: shrServiceRequest
    })
      .then(
        (response) => {
          console.log("=========================================================================")
          console.log("============== pushing ServiceRequest to Shr successfull=================")
          console.log("=========================================================================")
        }
      )
      .catch((error) => {
        console.log("==========================================================================")
        console.log(`==============Failed to pushed ServiceRequest to shr =====================`)
        console.log("==========================================================================")
      });
  }

  async list(req, res) {
    const order = await new Service().findTest(req, res);
    return order
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: order })
      : null;
  }

  async updateResult(req, res) {
    const ExistingOrders = await new Service().findAll();
    let ids = await ExistingOrders.map(o => { if (o.uniqueId) { return (o.uniqueId).toString() } })
    const data = {
      "uniqueId": ids
    }
    console.log("ids", ids.length)
    console.log("data", data)
    const response = await API.get(`${responses.VLSM_URL}/vl/fetch-results.php`, { data: data }).catch((error) => {
      console.log("error", error)
    })
    if (response && response.token) {
      const updateToken = await VlsmUser.update({ token: response.token }, {
        where: {
          username: process.env.VLSM_USERNAME
        }
      });
    }
    console.log("response", response.data)
    if (ExistingOrders.length && response.data && response.data.length) {
      _.forEach(ExistingOrders, async function (order) {
        const orderToUpdate = _.find(response.data, { uniqueId: order.uniqueId });
        if (orderToUpdate) {
          const performUpdate = await new Service().updateOrder(order.uniqueId, orderToUpdate);
        }
      });
    }
    if (response) {
      const log = new Utils().rightNow() + ' - ' + response.status + ' - ' + JSON.stringify(data);
      log_file.write(log + '\n');
    }
  }

  async vlsmSync(req, res) {
    const result = await new Service().vlsmSync(req, res);
    return result
      ? this.sendResponse({ req, res, type: responses.SUCCESS, data: result })
      : null;
  }
}

module.exports = Controller;
