const sequelize = require("sequelize");
const db = require("../../config/mysql");

const Order = db.define("lab_orders", {
  SampleID: {
    type: sequelize.STRING,
  },
  SampleBarcode: {
    type: sequelize.STRING,
    trim: true,
  },
  PatientID: {
    type: sequelize.STRING,
    trim: true,
  },
  PatientNames: {
    type: sequelize.STRING,
    trim: true,
  },
  lastName:{
    type: sequelize.STRING,
    trim: true
  },
  Gender: {
    type: sequelize.STRING,
    trim: true
  },
  PhoneNumber: {
    type: sequelize.STRING,
    trim: true
  },
  RevisionNumber: {
    type: sequelize.STRING,
    trim: true
  },
  TracnetID: {
    type: sequelize.STRING,
    trim: true,
  },
  patientAge:{
    type: sequelize.STRING,
    trim: true
  },
  birthDate: {
    type: sequelize.DATE,
    trim: true
  },
  FOSAID: {
    type: sequelize.STRING,
    trim: true
  },
  ApprovedBy:{
    type: sequelize.STRING,
    trim: true
  },
  SpecimenType: {
    type: sequelize.STRING,
    trim: true,
  },
  DateSampleReceived:{
    type: sequelize.DATE,
    trim: true
  },
  SubmissionDate: {
    type: sequelize.DATE,
    trim: true
  },
  SourceOfFunding: {
    type: sequelize.STRING,
    trim: true
  },
  PurposeOfTest: {
    type: sequelize.STRING,
    trim: true
  },
  DateOfTreatmentInitiation: {
    type: sequelize.DATE,
    trim: true
  },
  CurrentRegimen: {
    type: sequelize.STRING,
    trim: true
  },
  DateOfInitiationOfCurrentRegimen: {
    type: sequelize.DATE,
    trim: true
  },
  ARVAdherence: {
    type: sequelize.STRING,
    trim: true
  },
  IndicationForViralLoadTesting: {
    type: sequelize.STRING,
    trim: true
  },
  PTMECode: {
    type: sequelize.STRING,
    trim: true
  },
  MRN: {
    type: sequelize.STRING,
    trim: true
  },
  TestDate: {
    type: sequelize.DATE,
    trim: true
  }, 
  Laboratory: {
    type: sequelize.STRING,
    trim: true,
  },
  FacilityName: {
    type: sequelize.STRING,
    trim: true,
  },
  TestedBy:{
    type: sequelize.STRING,
    trim: true
  },
  ApprovedBy:{
    type: sequelize.STRING,
    trim: true
  },
  SpecimenType: {
    type: sequelize.STRING,
    trim: true,
  },
  TestName:{
    type: sequelize.STRING,
    trim: true
  },
  TestRequested: {
    type: sequelize.STRING,
    trim: true,
  },
  Results: {
    type: sequelize.JSON,
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
},  {
  timestamps: false
});

module.exports = Order;
