const moment = require("moment");
const axios = require("axios");
const { responses } = require("../libs/constants");
const VlsmUser = require('../components/vlsm/vlsmUserSchema');

class Utils {
  constructor() {
    return this;
  }

  rightNow() {
    return moment().format("YYYY-MM-DD :: hh:mm:ss");
  }

  async getAuthToken() {
    const user = await VlsmUser.findOne({ where: { username: process.env.VLSM_USERNAME } });
    let token = user.token;
    if (!token) {
      const res = await axios.post(`${responses.VLSM_URL}/user/login.php`, {
        userName: process.env.VLSM_USERNAME,
        password: process.env.VLSM_PASSWORD,
        apiVersion: process.env.VLSM_API_VERSION
      });
      token = res.status ? res.data.data.api_token : '';
      if (token) {
        const updateToken = await VlsmUser.update({ token: token }, {
          where: {
            username: process.env.VLSM_USERNAME
          }
        });
      }
    }
    let pattern = /^(Bearer)/;
    if(pattern.test(token)){
      return token
    }
    return "Bearer " + token;

    // const res = await axios.post(`${responses.VLSM_URL}/user/login.php`, {
    //   userName: process.env.VLSM_USERNAME,
    //   password: process.env.VLSM_PASSWORD,
    //   apiVersion: process.env.VLSM_API_VERSION
    // })
    // if (res.status) {
    //   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', res.data.data.api_token)
    //   return res.data.data.api_token
    // } else {
    //   return ''
    // }
  }
  async formatData(element) {
    const patientDob = this.isValidDate(element.patientDob ? element.patientDob : element.dob ? element.dob : element.patientDob) ? (element.patientDob ? element.patientDob : element.dob ? element.dob : element.patientDob) : this.convertTimeStampToDateText(element.patientDob ? element.patientDob : element.dob ? element.dob : element.patientDob);
    const dateOfArtInitiation = this.isValidDate(element.dateOfArtInitiation) ? element.dateOfArtInitiation : this.convertTimeStampToDateText(element.dateOfArtInitiation);
    const dateOfArvRegimenChange = this.isValidDate(element.dateOfArvRegimenChange) ? element.dateOfArvRegimenChange : this.convertTimeStampToDateText(element.dateOfArvRegimenChange);
    const regimenInitiatedOn = this.isValidDate(element.regimenInitiatedOn) ? element.regimenInitiatedOn : this.convertTimeStampToDateText(element.regimenInitiatedOn);
    const lastViralLoadTestDate = this.isValidDate(element.lastViralLoadTestDate) ? element.lastViralLoadTestDate : this.convertTimeStampToDateText(element.lastViralLoadTestDate);
    const dateOfCompletionOfViralLoad = this.isValidDate(element.dateOfCompletionOfViralLoad) ? element.dateOfCompletionOfViralLoad : this.convertTimeStampToDateText(element.dateOfCompletionOfViralLoad);
    const rmTestingLastVLDate = this.isValidDate(element.rmTestingLastVLDate) ? element.rmTestingLastVLDate : this.convertTimeStampToDateText(element.rmTestingLastVLDate);
    const repeatTestingLastVLDate = this.isValidDate(element.repeatTestingLastVLDate) ? element.repeatTestingLastVLDate : this.convertTimeStampToDateText(element.repeatTestingLastVLDate);
    const suspendTreatmentLastVLDate = this.isValidDate(element.suspendTreatmentLastVLDate) ? element.suspendTreatmentLastVLDate : this.convertTimeStampToDateText(element.suspendTreatmentLastVLDate);
    const requestDate = this.isValidDate(element.requestDate) ? element.requestDate : this.convertTimeStampToDateText(element.requestDate);
    const sampleReceivedAtHubOn = this.isValidDate(element.sampleReceivedAtHubOn) ? element.sampleReceivedAtHubOn : this.convertTimeStampToDateText(element.sampleReceivedAtHubOn);
    const sampleReceivedDate = this.isValidDate(element.sampleReceivedDate) ? element.sampleReceivedDate : this.convertTimeStampToDateText(element.sampleReceivedDate);
    const sampleTestingDateAtLab = this.isValidDate(element.sampleTestingDateAtLab) ? element.sampleTestingDateAtLab : this.convertTimeStampToDateText(element.sampleTestingDateAtLab);
    const sampleDispatchedOn = this.isValidDate(element.sampleDispatchedOn) ? element.sampleDispatchedOn : this.convertTimeStampToDateText(element.sampleDispatchedOn);
    const resultDispatchedOn = this.isValidDate(element.resultDispatchedOn) ? element.resultDispatchedOn : this.convertTimeStampToDateText(element.resultDispatchedOn);
    const rejectionDate = this.isValidDate(element.rejectionDate) ? element.rejectionDate : this.convertTimeStampToDateText(element.rejectionDate);
    const approvedOnDateTime = this.isValidDate(element.approvedOnDateTime) ? element.approvedOnDateTime : this.convertTimeStampToDateText(element.approvedOnDateTime);
    const sampleCollectionDate = this.isValidDate(element.sampleCollectionDate) ? element.sampleCollectionDate : this.convertTimeStampToDateText(element.sampleCollectionDate);
    const formatData = {
      "formId": element.formId ? element.formId : "",
      "uniqueId": element.uniqueId ? element.uniqueId : "",
      "appSampleCode": element.appSampleCode ? element.appSampleCode : "",
      "remoteSampleCode": element.remoteSampleCode ? element.remoteSampleCode : "",
      "sampleCodeTitle": element.sampleCodeTitle ? element.sampleCodeTitle : "",
      "sampleReordered": element.sampleReordered ? element.sampleReordered : "",
      "sampleCodeFormat": element.sampleCodeFormat ? element.sampleCodeFormat : "",
      "facilityId": element.facilityId ? element.facilityId : "",
      "provinceId": element.provinceId ? element.provinceId : "",
      "serialNo": element.serialNo ? element.serialNo : "",
      "clinicianName": element.clinicianName ? element.clinicianName : "",
      "clinicanTelephone": element.clinicanTelephone ? element.clinicanTelephone : "",
      "patientFirstName": element.patientFirstName ? element.patientFirstName : "",
      "patientMiddleName": element.patientMiddleName ? element.patientMiddleName : "",
      "patientLastName": element.patientLastName ? element.patientLastName : "",
      "patientGender": element.patientGender ? element.patientGender : element.gender ? element.gender : "",
      "patientDob": patientDob,
      "ageInYears": element.ageInYears ? element.ageInYears : "",
      "ageInMonths": element.ageInMonths ? element.ageInMonths : "",
      "patientPregnant": element.patientPregnant ? element.patientPregnant : "",
      "trimester": element.trimester ? element.trimester : "",
      "isPatientNew": element.isPatientNew ? element.isPatientNew : "",
      "breastfeeding": element.breastfeeding ? element.breastfeeding : "",
      "patientArtNo": element.patientArtNo ? element.patientArtNo : element.artNo ? element.artNo : "",
      "dateOfArtInitiation": dateOfArtInitiation,
      "artRegimen": element.artRegimen ? element.artRegimen : "",
      "hasChangedRegimen": element.hasChangedRegimen ? element.hasChangedRegimen : "",
      "reasonForArvRegimenChange": element.reasonForArvRegimenChange ? element.reasonForArvRegimenChange : "",
      "dateOfArvRegimenChange": dateOfArvRegimenChange,
      "regimenInitiatedOn": regimenInitiatedOn,
      "vlTestReason": element.vlTestReason ? element.vlTestReason : "",
      "lastViralLoadResult": element.lastViralLoadResult ? element.lastViralLoadResult : "",
      "lastViralLoadTestDate": lastViralLoadTestDate,
      "conservationTemperature": element.conservationTemperature ? element.conservationTemperature : "",
      "durationOfConservation": element.durationOfConservation ? element.durationOfConservation : "",
      "dateOfCompletionOfViralLoad": dateOfCompletionOfViralLoad,
      "viralLoadNo": element.viralLoadNo ? element.viralLoadNo : "",
      "patientPhoneNumber": element.patientPhoneNumber ? element.patientPhoneNumber : "",
      "receiveSms": element.receiveSms ? element.receiveSms : "",
      // "specimenType": element.specimenType ? element.specimenType : "",
      "arvAdherence": element.arvAdherence ? element.arvAdherence : "",
      "stViralTesting": element.stViralTesting ? element.stViralTesting : "",
      "rmTestingLastVLDate": rmTestingLastVLDate,
      "rmTestingVlValue": element.rmTestingVlValue ? element.rmTestingVlValue : "",
      "repeatTestingLastVLDate": repeatTestingLastVLDate,
      "repeatTestingVlValue": element.repeatTestingVlValue ? element.repeatTestingVlValue : "",
      "suspendTreatmentLastVLDate": suspendTreatmentLastVLDate,
      "suspendTreatmentVlValue": element.suspendTreatmentVlValue ? element.suspendTreatmentVlValue : "",
      "reqClinician": element.reqClinician ? element.reqClinician : "",
      "reqClinicianPhoneNumber": element.reqClinicianPhoneNumber ? element.reqClinicianPhoneNumber : "",
      "requestDate": requestDate,
      "vlFocalPerson": element.vlFocalPerson ? element.vlFocalPerson : "",
      "vlFocalPersonPhoneNumber": element.vlFocalPersonPhoneNumber ? element.vlFocalPersonPhoneNumber : "",
      "labId": element.labId ? element.labId : "",
      "testingPlatform": element.testingPlatform ? element.testingPlatform : "",
      "sampleReceivedAtHubOn": sampleReceivedAtHubOn,
      "sampleReceivedDate": sampleReceivedDate,
      "sampleTestingDateAtLab": sampleTestingDateAtLab,
      "sampleDispatchedOn": sampleDispatchedOn,
      "resultDispatchedOn": resultDispatchedOn,
      "isSampleRejected": element.isSampleRejected ? element.isSampleRejected : "",
      "rejectionReason": element.rejectionReason ? element.rejectionReason : null,
      "rejectionDate": rejectionDate,
      "vlResult": element.vlResult ? element.vlResult : "",
      "vlResultAbsoluteDecimal": element.vlResultAbsoluteDecimal ? element.vlResultAbsoluteDecimal : "",
      "result": element.result ? element.result : "",
      "revisedBy": element.revisedBy ? element.revisedBy : "",
      "revisedOn": element.revisedOn ? element.revisedOn : null,
      "reasonForVlResultChanges": element.reasonForVlResultChanges ? element.reasonForVlResultChanges : "",
      "vlLog": element.vlLog ? element.vlLog : "",
      "testedBy": element.testedBy ? element.testedBy : "",
      "reviewedBy": element.reviewedBy ? element.reviewedBy : "",
      "reviewedOn": element.reviewedOn ? element.reviewedOn : null,
      "approvedBy": element.approvedBy ? element.approvedBy : "",
      "approvedOnDateTime": approvedOnDateTime,
      "labComments": element.labComments ? element.labComments : "",
      "resultStatus": element.resultStatus ? element.resultStatus : "",
      "fundingSource": element.fundingSource ? element.fundingSource : "",
      "implementingPartner": element.implementingPartner ? element.implementingPartner : "",
      "sampleCollectionDate": sampleCollectionDate
    }
    return formatData;
  }

  isValidDate(date) {
    return /[a-zA-Z]/.test(date);
  }

  convertTimeStampToDateText(dateTimeStamp) {
    const splittedDate = dateTimeStamp.split(" ");
    const date = splittedDate[0];
    if (date == '0000-00-00') {
      return dateTimeStamp;
    } else {
      const time = splittedDate.length > 1 ? splittedDate[1] : '00:00:00';
      const dateProps = date.split('-');
      const monthInName = dateProps[1] == '01' ? 'Jan' :
        dateProps[1] == '02' ? 'Feb' :
          dateProps[1] == '03' ? 'Mar' :
            dateProps[1] == '04' ? 'Apr' :
              dateProps[1] == '05' ? 'May' :
                dateProps[1] == '06' ? 'Jun' :
                  dateProps[1] == '07' ? 'Jul' :
                    dateProps[1] == '08' ? 'Aug' :
                      dateProps[1] == '09' ? 'Sep' :
                        dateProps[1] == '10' ? 'Oct' :
                          dateProps[1] == '11' ? 'Nov' :
                            dateProps[1] == '12' ? 'Dec' : '';
      const covertedDate = dateProps[2] + '-' + monthInName + '-' + dateProps[0];
      const formattedDate = splittedDate.length > 1 ? (covertedDate + ' ' + time) : covertedDate;
      return formattedDate;
    }
  }

  random(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  generateShrId() {
    return `${this.random(8)}-${this.random(4)}-${this.random(4)}-${this.random(4)}-${this.random(11)}`
  }

  getCurrentDateAndTime() {
    return new Date((new Date().getTime()) + 2 * 60 * 60 * 1000);
  }
}

module.exports = Utils;
