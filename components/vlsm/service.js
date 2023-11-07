const Controller = require("../base/controller");
const Schema = require("./schema");
const { responses } = require("../../libs/constants");
const { Op } = require("sequelize");
const Utils = require('../../helpers/utils');
const moment = require("moment");
const _ = require('lodash');

class Service extends Controller {
  constructor() {
    super();
    return this;
  }

  async create(req, res) {
    try {
      req.data.forEach(element => {
        // const formatData = new Utils().formatData(element)
        element.createdAt = new Utils().getCurrentDateAndTime();
        element.updatedAt = new Utils().getCurrentDateAndTime();
        const order = new Schema({...element});
        order.save();
      });

      // const order = new Schema(req.data);
      // return await order.save();
    } catch (error) {
      console.log("error", error)
      let responseType = responses.INTERNAL_SERVER_ERROR;
      responseType.MSG = error.message;

      this.sendResponse({ req, res, type: responseType });
    }
  }

  async findTest(req, res) {
    try {
      const { uniqueid, facilityid, testname, datefrom, dateto , page, size } = req.query;

      if (
        uniqueid == undefined &&
        facilityid == undefined
      ) {
        throw new Error(responses.BAD_REQUEST.MSG);
      }

      let whereQuery = {};
      if (uniqueid) {
        whereQuery.patientid = uniqueid;
      }
      if (facilityid) {
        whereQuery.facilityid = facilityid;
      }
      if (testname) {
        whereQuery.specimentype = { [Op.like]: `%${testname}%` };
      }
      if (datefrom || dateto) {
        let dateFrom = datefrom ? moment.utc(datefrom).startOf('day').format() : '';
        let dateTo = dateto ? moment.utc(dateto).endOf('day').format() : '';
        if (datefrom && dateto) {
          whereQuery.createdat = { [Op.and]: [{[Op.gte]: dateFrom}, {[Op.lte]: dateTo}] };
        } else if (datefrom && !dateto) {
          whereQuery.createdat = { [Op.gte]: dateFrom };
        } else if (!datefrom && dateto) {
          whereQuery.createdat = { [Op.lte]: dateTo };
        }
      }
      const pagination = this.getPagination(page, size);
      const order = await Schema.findAll({ limit: pagination.limit, offset: pagination.offset, where: whereQuery})

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
          "You must specify the facilityid or uniqueid";
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
      return null
    }
  }

  async findAll() {
    const all = await Schema.findAll({where: {vlResult: {
      [Op.or]: ["", null]},
      result: {
        [Op.or]: ["", null],
    }}, attributes: ['uniqueId', 'appSampleCode']});
    return all;
  }

  async updateOrder(uniqueId, dataToUpdate) {
    const formatData = await new Utils().formatData(dataToUpdate)
    formatData.updatedAt = new Utils().getCurrentDateAndTime();
    try {
      const updateResult = await Schema.update({...formatData}, {
        where: {
          uniqueid: uniqueId.toString()
        }
      });
      return updateResult;
    } catch (error) {
      console.log("error", error)
    }

  }

  async findAllIds(ids) {
    const result = await Schema.findAll({where:{uniqueid:{[Op.in]: ids}}});
    return result;
  }

  async vlsmSync(req, res) {
    const { facilityId, lastUpdatedId, pendingIds} = req.body;
    if (!facilityId || !lastUpdatedId) {
      throw new Error(responses.BAD_REQUEST.MSG);
    }
    let list = [];
    let existingOrders = [];
    if (pendingIds.length) {
      const resultsPendingFromExistList = { facilityid: facilityId, id: pendingIds};
      let arr = await Schema.findAll({where: resultsPendingFromExistList});
      if (arr.length) {
        arr.map(
          (item) => {
            if (!_.isEmpty(item.result)) {
              existingOrders.push(item)
            }
          }
        )
      }
    }

    const newOrdersQuery = { facilityid: facilityId, id: {[Op.gt]: lastUpdatedId} };
    let newOrders = await Schema.findAll({where: newOrdersQuery});
    list = [...existingOrders, ...newOrders]

    return list;
  }
}

module.exports = Service;
