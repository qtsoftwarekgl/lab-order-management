const Controller = require("../base/controller");
const { responses } = require("../../libs/constants");
const soapRequest = require('easy-soap-request');
const parseString = require('xml2js').parseString;
const moment = require('moment')

class Labware extends Controller {
    constructor() {
      super();
      return this;
    }

    async labwareAuthentication() {
        console.log("authdata***")
        try {
            const url = `${responses.LABWARE_URL}/labware_weblims_authenticate.labware_weblims_authenticateHttpSoap11Endpoint`
            const headers = {
            'Content-Type': 'text/xml'
            };
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lab="labware_weblims_authenticate">
                <soapenv:Header/>
                <soapenv:Body>
                <lab:authenticate>
                    <!--Optional:-->
                    <!--type: string-->
                    <lab:username>${process.env.LABWARE_USERNAME}</lab:username>
                    <!--Optional:-->
                    <!--type: string-->
                    <lab:password>${process.env.LABWARE_PASSWORD}</lab:password>
                    <!--Optional:-->
                    <!--type: string-->
                    <lab:limsDSName>NRL_LIMS</lab:limsDSName>
                    <!--Optional:-->
                    <!--type: string-->
                    <lab:limsServiceName>EMR_CM</lab:limsServiceName>
                </lab:authenticate>
                </soapenv:Body>
            </soapenv:Envelope>`;

            const { response } = await soapRequest({ url: url, headers: headers, xml: xml });
            const { body, statusCode } = response;
            console.log("body",JSON.stringify(body));
            console.log("statusCode",statusCode);
            if (statusCode === 200) {
                let authenticateRes;
                await parseString(body, function (err, result) {
                    console.log("result", JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4))
                    authenticateRes = JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4);
                });
                let authToken = JSON.parse(authenticateRes)
                console.log("authToken", authToken[0])
                authToken = authToken[0]["ns:authenticateResponse"][0]["ns:return"][0]
                return authToken;
            }
        } catch (e) {
            console.log("labwareAuthentication error", e)
            return null;
        }
    }

    async labwareCreateUpdatePatient(data) {
        data.birthDate = data.birthDate ? moment(data.birthDate).format('YYYY/MM/DD') : ''
        data.RevisionNumber = data.RevisionNumber ? data.RevisionNumber : '1'
        data.CollectionDate = data.CollectionDate ? moment(data.CollectionDate).format('YYYY-MM-DD HH:mm') : ''
        data.TestDate = data.TestDate ? moment(data.TestDate).format('YYYY-MM-DD HH:mm') : ''
        data.DateSampleReceived = data.SubmissionDate ? moment(data.DateSampleReceived).format('YYYY-MM-DD HH:mm') : ''
        console.log("data", data)
        try {
            let authToken = await this.labwareAuthentication();
            const url = `${responses.LABWARE_URL}/EMR_CREATE_UPDATE_PATIENT.EMR_CREATE_UPDATE_PATIENTHttpSoap11Endpoint`
            const headers = {
            'Content-Type': 'text/xml'
            };
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.labware.com/webservice">
                <soapenv:Header/>
                <soapenv:Body>
                <web:invoke>
                    <!--Optional:-->
                    <!--type: string-->
                    <web:authToken>${authToken}</web:authToken>
                    <!--Optional:-->
                    <!--type: string-->
                    <web:logdataC>
                        {
                            "PatientID": ${data.PatientID},
                            "TracnetID": ${data.TracnetID},
                            "FirstName": ${data.PatientNames},
                            "LastName": ${data.lastName},
                            "DOB": ${data.birthDate},
                            "Age": ${data.patientAge},
                            "Gender": ${data.Gender},
                            "PhoneNumber": ${data.PhoneNumber},
                            "RevisionNumber": ${data.RevisionNumber}
                        }
                    </web:logdataC>
                </web:invoke>
                </soapenv:Body>
            </soapenv:Envelope>`;
console.log("xml####", xml)
            const { response } = await soapRequest({ url: url, headers: headers, xml: xml });
            const { body, statusCode } = response;
            console.log("body",body);
            console.log("statusCode",statusCode);
            let patientRes;
            if (statusCode === 200) {
                await parseString(body, function (err, result) {
                    console.log("result", JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4))
                    patientRes = JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4);
                });
                console.log("patientRes", JSON.parse(patientRes))
                
                    await this.labwareAuthenticationClose(authToken)
                    await this.labwareSampleLog(data)
                    return JSON.parse(patientRes);
                
            }
        } catch (e) {
            console.log("labwareCreateUpdatePatient error", e)
            return null;
        }
        
    }

    async labwareSampleLog(data) {
        console.log("labwareSampleLog", data)
        try {
            let authToken = await this.labwareAuthentication();
            const url = `${responses.LABWARE_URL}/MIS_LOG_SAMPLE.MIS_LOG_SAMPLEHttpSoap11Endpoint`
            const headers = {
            'Content-Type': 'text/xml'
            };
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.labware.com/webservice">
                <soapenv:Header/>
                <soapenv:Body>
                <web:invoke>
                    <!--Optional:-->
                    <!--type: string-->
                    <web:authToken>${authToken}</web:authToken>
                    <!--Optional:-->
                    <!--type: string-->
                    <web:logdatasC>
                        {
                            "PatientID": ${data.PatientID},
                            "TracnetID": ${data.TracnetID},
                            "FirstName": ${data.PatientNames},
                            "LastName": ${data.lastName},
                            "DOB": ${data.birthDate},
                            "Age": ${data.patientAge},
                            "Gender": ${data.Gender},
                            "PhoneNumber": ${data.PhoneNumber},
                            "RevisionNumber": ${data.RevisionNumber},
                            "FOSAID": ${data.FOSAID},
                            "FacilityName": ${data.FacilityName},
                            "SampleID": "",
                            "SpecimenType": ${data.SpecimenType},
                            "TestRequested": ${data.TestRequested},
                            "Laboratory": ${data.Laboratory},
                            "SampleCollectionDate": ${data.CollectionDate},
                            "SubmissionDate": ${data.SubmissionDate},
                            "SourceofFunding": ${data.SourceOfFunding},
                            "PurposeofTest": ${data.PurposeOfTest},
                            "DateofTreatmentInitiation": ${data.DateOfTreatmentInitiation},
                            "CurrentRegimen": ${data.CurrentRegimen},
                            "DateofInitiationofCurrentRegimen": ${data.DateOfInitiationOfCurrentRegimen},
                            "ARVAdherence": ${data.ARVAdherence},
                            "IndicationforViralLoadTesting": ${data.IndicationForViralLoadTesting},
                            "PTMECode": "",
                            "MRN": "",
                            "LabOrderID": ${data.LabOrderID}
                        }
                    </web:logdatasC>
                </web:invoke>
                </soapenv:Body>
            </soapenv:Envelope>`;
console.log("Laborder", xml)
console.log("url", url)
            const { response } = await soapRequest({ url: url, headers: headers, xml: xml });
            const { body, statusCode } = response;
            console.log("body",body);
            console.log("statusCode",statusCode);
            let sampleRes;
            if (statusCode === 200) {
                await parseString(body, function (err, result) {
                    console.log("result", JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4))
                    sampleRes = JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4);
                });
                console.log("sampleRes", JSON.parse(sampleRes))
                try {
                    await this.labwareAuthenticationClose(authToken)
                    return JSON.parse(sampleRes);
                }  catch (e) {
                    console.log("labwareSampleLog error", e)
                }
            }
        } catch (e) {
            console.log("error", e)
            return null;
        }
    }

    async labwareAuthenticationClose(authToken) {
        console.log("AuthenticationClose***", authToken)
        
        try {
            const url = `${responses.LABWARE_URL}/labware_weblims_close.labware_weblims_closeHttpSoap11Endpoint`
            const headers = {
            'Content-Type': 'text/xml'
            };
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lab="labware_weblims_close">
                <soapenv:Header/>
                <soapenv:Body>
                    <lab:close>
                        <!--Optional:--> <lab:authToken>${authToken}</lab:authToken>
                    </lab:close>
                </soapenv:Body>
            </soapenv:Envelope>`;
            const { response } = await soapRequest({ url: url, headers: headers, xml: xml });
            const { body, statusCode } = response;
            console.log("body",JSON.stringify(body));
            console.log("statusCode",statusCode);
            let authenticateRes;
            await parseString(body, function (err, result) {
                console.log("result", JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4))
                authenticateRes = JSON.stringify(result["soapenv:Envelope"]["soapenv:Body"], null, 4);
            });
            console.log("authenticateRes", JSON.parse(authenticateRes))
            return JSON.parse(authenticateRes);
        } catch (e) {
            console.log("AuthenticationClose error", e)
        }
    }
}

module.exports = Labware;