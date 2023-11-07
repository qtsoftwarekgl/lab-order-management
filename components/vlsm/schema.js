const sequelize = require("sequelize");
const db = require("../../config/mysql");

const VlsmTest = db.define("vlsm_orders", {
  formId: {
    type: sequelize.STRING,
    trim: true
  },
  uniqueId: {
    type: sequelize.STRING,
    trim: true,
  },
  appSampleCode: {
    type: sequelize.STRING,
    trim: true,
  },
  sampleCode: {
    type: sequelize.STRING,
    trim: true,
  },
  remoteSampleCode: {
    type: sequelize.STRING,
    trim: true,
  },
  sampleCodeTitle: {
    type: sequelize.STRING,
    trim: true,
  },
  sampleReordered: {
    type: sequelize.STRING,
  },
  sampleCodeFormat: {
    type: sequelize.STRING,
    trim: true,
  },
  facilityId: {
    type: sequelize.STRING,
    trim: true,
  },
  provinceId: {
    type: sequelize.STRING,
    trim: true,
  },
  serialNo: {
    type: sequelize.STRING,
    trim: true,
  },
  clinicianName: {
    type: sequelize.STRING,
    trim: true,
  },
  clinicanTelephone: {
    type: sequelize.STRING,
    trim: true,
  },
  patientFirstName: {
    type: sequelize.STRING,
    trim: true,
  },
  patientMiddleName: {
    type: sequelize.STRING,
    trim: true,
  },
  patientLastName: {
    type: sequelize.STRING,
    trim: true,
  },
  patientGender: {
    type: sequelize.STRING,
    trim: true,
  },
  patientDob: {
    type: sequelize.TEXT,
    trim: true,
  },
  ageInYears: {
    type: sequelize.STRING,
    trim: true,
  },
  ageInMonths: {
    type: sequelize.STRING,
    trim: true,
  },
  patientPregnant: {
    type: sequelize.STRING,
    trim: true,
  },
  trimester: {
    type: sequelize.STRING,
    trim: true,
  },
  isPatientNew: {
    type: sequelize.STRING,
    trim: true,
  },
  breastfeeding: {
    type: sequelize.STRING,
    trim: true,
  },
  patientArtNo: {
    type: sequelize.STRING,
    trim: true,
  },
  dateOfArtInitiation: {
    type: sequelize.TEXT,
    trim: true,
  },
  artRegimen: {
    type: sequelize.STRING,
    trim: true,
  },
  hasChangedRegimen: {
    type: sequelize.STRING,
    trim: true,
  },
  reasonForArvRegimenChange: {
    type: sequelize.STRING,
    trim: true,
  },
  dateOfArvRegimenChange: {
    type: sequelize.TEXT,
    trim: true,
  },
  regimenInitiatedOn: {
    type: sequelize.TEXT,
    trim: true,
  },
  vlTestReason: {
    type: sequelize.STRING,
    trim: true,
  },
  lastViralLoadResult: {
    type: sequelize.STRING,
    trim: true,
  },
  lastViralLoadTestDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  conservationTemperature: {
    type: sequelize.STRING,
    trim: true,
  },
  durationOfConservation: {
    type: sequelize.STRING,
    trim: true,
  },
  dateOfCompletionOfViralLoad: {
    type: sequelize.TEXT,
    trim: true,
  },
  viralLoadNo: {
    type: sequelize.TEXT,
    trim: true,
  },
  patientPhoneNumber: {
    type: sequelize.STRING,
    trim: true,
  },
  receiveSms: {
    type: sequelize.TEXT,
    trim: true,
  },
  specimenType: {
    type: sequelize.TEXT,
    trim: true,
  },
  arvAdherence: {
    type: sequelize.TEXT,
    trim: true,
  },
  stViralTesting: {
    type: sequelize.TEXT,
    trim: true,
  },
  rmTestingLastVLDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  rmTestingVlValue: {
    type: sequelize.TEXT,
    trim: true,
  },
  repeatTestingLastVLDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  repeatTestingVlValue: {
    type: sequelize.STRING,
    trim: true,
  },
  suspendTreatmentLastVLDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  suspendTreatmentVlValue: {
    type: sequelize.STRING,
    trim: true,
  },
  reqClinician: {
    type: sequelize.STRING,
    trim: true,
  },
  reqClinicianPhoneNumber: {
    type: sequelize.STRING,
    trim: true,
  },
  requestDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  vlFocalPerson: {
    type: sequelize.STRING,
    trim: true,
  },
  vlFocalPersonPhoneNumber: {
    type: sequelize.STRING,
    trim: true,
  },
  labId: {
    type: sequelize.STRING,
    trim: true,
  },
  testingPlatform: {
    type: sequelize.STRING,
    trim: true,
  },
  sampleReceivedAtHubOn: {
    type: sequelize.TEXT,
    trim: true,
  },
  sampleReceivedDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  sampleTestingDateAtLab: {
    type: sequelize.TEXT,
    trim: true,
  },
  sampleDispatchedOn: {
    type: sequelize.TEXT,
    trim: true,
  },
  resultDispatchedOn: {
    type: sequelize.TEXT,
    trim: true,
  },
  isSampleRejected: {
    type: sequelize.STRING,
    trim: true,
  },
  rejectionReason: {
    type: sequelize.STRING,
    trim: true,
  },
  rejectionDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  vlResult: {
    type: sequelize.STRING,
    trim: true,
  },
  vlResultAbsoluteDecimal: {
    type: sequelize.STRING,
    trim: true,
  },
  result: {
    type: sequelize.STRING,
    trim: true,
  },
  revisedBy: {
    type: sequelize.STRING,
    trim: true,
  },
  revisedOn: {
    type: sequelize.STRING,
    trim: true,
  },
  reasonForVlResultChanges: {
    type: sequelize.STRING,
    trim: true,
  },
  vlLog: {
    type: sequelize.STRING,
    trim: true,
  },
  testedBy: {
    type: sequelize.STRING,
    trim: true,
  },
  reviewedBy: {
    type: sequelize.STRING,
    trim: true,
  },
  reviewedOn: {
    type: sequelize.STRING,
    trim: true,
  },
  approvedBy: {
    type: sequelize.STRING,
    trim: true,
  },
  approvedOnDateTime: {
    type: sequelize.TEXT,
    trim: true,
  },
  labComments: {
    type: sequelize.STRING,
    trim: true,
  },
  resultStatus: {
    type: sequelize.STRING,
    trim: true,
  },
  fundingSource: {
    type: sequelize.STRING,
    trim: true,
  },
  implementingPartner: {
    type: sequelize.STRING,
    trim: true,
  },
  sampleCollectionDate: {
    type: sequelize.TEXT,
    trim: true,
  },
  patientId: {
    type: sequelize.STRING,
    trim: true
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: new Date((new Date().getTime()) + 2 * 60 * 60 * 1000),
    allowNull: false,
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: new Date((new Date().getTime()) + 2 * 60 * 60 * 1000),
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = VlsmTest;
