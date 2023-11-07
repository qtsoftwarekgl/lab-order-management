class Constant {
  static responses = {
    SUCCESS: { CODE: 200, MSG: "Success" },
    HEADER: {
      AUTHORIZATION: 'Authorization',
      CONTENT_TYPE: 'application/json',
      MULTIPART_CONTENT_TYPE: 'multipart/form-data',
      TIMEOUT: 120000
    },
    ERROR: {
      MSG: 'error',
      INVALID_RESPONSE: 'INVALID_RESPONSE'
    },
    BAD_REQUEST: { CODE: 400, MSG: "Bad Request" },
    RESOURCE_ALREADY_EXISTS: { CODE: 409, MSG: "Resource Already Exists" },
    MOVED_PERMANENTLY: { CODE: 301, MSG: "Moved Permanently" },
    UNAUTHORIZED_REQUEST: { CODE: 401, MSG: "Unauthorized Request" },
    FORBIDDEN_REQUEST: { CODE: 403, MSG: "Forbidden Request" },
    RESOURCE_NOT_FOUND: { CODE: 404, MSG: "Resource Not Found" },
    INVALID_PAYLOAD: { CODE: 422, MSG: "Invalid Input Payload" },
    INTERNAL_SERVER_ERROR: { CODE: 500, MSG: "Internal Server Error" },
    VLSM_URL: 'https://rwd.labsinformatics.com/api/v1.1',
    LABWARE_URL: 'http://197.243.108.21:8080/WebLIMS/services'
  };
  static VlsmOrderPayload = {
    "appVersion": process.env.VLSM_API_VERSION,
    "data": [
      {
        "formId": 1,
        "uniqueId": "85221ea3c053ac3a2b41d92879746a1b",
        "appSampleCode": "UNIQVL001",
        "sampleCode": "",
        "remoteSampleCode": "",
        "sampleCodeTitle": "auto",
        "sampleReordered": "no",
        "sampleCodeFormat": "",
        "facilityId": "3",
        "provinceId": "6",
        "serialNo": "6",
        "clinicianName": "6",
        "clinicanTelephone": "6",
        "sampleCollectionDate": "01-Sep-2021 10:36",
        "patientFirstName": "Raja",
        "patientMiddleName": "sekar",
        "patientLastName": "Reddy",
        "patientGender": "male",
        "patientDob": "12-Mar-1994",
        "ageInYears": "27",
        "ageInMonths": "6",
        "patientPregnant": "no",
        "trimester": "no",
        "isPatientNew": "no",
        "breastfeeding": "no",
        "patientArtNo": "TR4578",
        "dateOfArtInitiation": "12-Apr-2020",
        "artRegimen": "TDF/3TC/Kal",
        "hasChangedRegimen": "",
        "reasonForArvRegimenChange": "",
        "dateOfArvRegimenChange": "",
        "regimenInitiatedOn": "12-Apr-2020",
        "vlTestReason": "",
        "lastViralLoadResult": "",
        "lastViralLoadTestDate": "",
        "conservationTemperature": "",
        "durationOfConservation": "",
        "dateOfCompletionOfViralLoad": "",
        "viralLoadNo": "",
        "patientPhoneNumber": "987463210",
        "receiveSms": "no",
        "specimenType": "2",
        "arvAdherence": "good",
        "stViralTesting": "failure",
        "rmTestingLastVLDate": "",
        "rmTestingVlValue": "",
        "repeatTestingLastVLDate": "03-Sep-2021",
        "repeatTestingVlValue": "1.36",
        "suspendTreatmentLastVLDate": "",
        "suspendTreatmentVlValue": "",
        "reqClinician": "Thana",
        "reqClinicianPhoneNumber": "9512368740",
        "requestDate": "03-Sep-2021",
        "vlFocalPerson": "James",
        "vlFocalPersonPhoneNumber": "9874512360",
        "labId": "16",
        "testingPlatform": "GeneXpert",
        "sampleReceivedAtHubOn": "04-Sep-2021 07:34",
        "sampleReceivedDate": "04-Sep-2021 07:34",
        "sampleTestingDateAtLab": "04-Sep-2021 07:34",
        "sampleDispatchedOn": "04-Sep-2021 07:34",
        "resultDispatchedOn": "04-Sep-2021 07:34",
        "isSampleRejected": "yes",
        "rejectionReason": "3",
        "rejectionDate": "04-Sep-2021",
        "vlResult": null,
        "vlResultAbsoluteDecimal": "0.37",
        "result": null,
        "revisedBy": "",
        "revisedOn": "",
        "reasonForVlResultChanges": "",
        "vlLog": "",
        "testedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "reviewedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "reviewedOn": "23-Sep-2021 14:01",
        "approvedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "approvedOnDateTime": "23-Sep-2021 14:01",
        "labComments": "some commends",
        "resultStatus": "2",
        "fundingSource": "1",
        "implementingPartner": "1"
      },
      {
        "formId": 1,
        "uniqueId": "85221ea3c053ac3a2b41d92879746a4bw34",
        "appSampleCode": "UNIQVL002",
        "sampleCode": "",
        "remoteSampleCode": "",
        "sampleCodeTitle": "auto",
        "sampleReordered": "no",
        "sampleCodeFormat": "",
        "facilityId": "3",
        "provinceId": "6",
        "serialNo": "6",
        "clinicianName": "6",
        "clinicanTelephone": "6",
        "sampleCollectionDate": "01-Sep-2021 10:36",
        "patientFirstName": "John",
        "patientMiddleName": "",
        "patientLastName": "Smith",
        "patientGender": "male",
        "patientDob": "12-Mar-1997",
        "ageInYears": "27",
        "ageInMonths": "6",
        "patientPregnant": "no",
        "trimester": "no",
        "isPatientNew": "no",
        "breastfeeding": "no",
        "patientArtNo": "TR4578",
        "dateOfArtInitiation": "12-Apr-2020",
        "artRegimen": "TDF/3TC/Kal",
        "hasChangedRegimen": "",
        "reasonForArvRegimenChange": "",
        "dateOfArvRegimenChange": "",
        "regimenInitiatedOn": "12-Apr-2020",
        "vlTestReason": "",
        "lastViralLoadResult": "",
        "lastViralLoadTestDate": "",
        "conservationTemperature": "",
        "durationOfConservation": "",
        "dateOfCompletionOfViralLoad": "",
        "viralLoadNo": "",
        "patientPhoneNumber": "987463210",
        "receiveSms": "no",
        "specimenType": "2",
        "arvAdherence": "good",
        "stViralTesting": "failure",
        "rmTestingLastVLDate": "",
        "rmTestingVlValue": "",
        "repeatTestingLastVLDate": "03-Sep-2021",
        "repeatTestingVlValue": "1.36",
        "suspendTreatmentLastVLDate": "",
        "suspendTreatmentVlValue": "",
        "reqClinician": "Thana",
        "reqClinicianPhoneNumber": "9512368740",
        "requestDate": "03-Sep-2021",
        "vlFocalPerson": "James",
        "vlFocalPersonPhoneNumber": "9874512360",
        "labId": "16",
        "testingPlatform": "GeneXpert",
        "sampleReceivedAtHubOn": "04-Sep-2021 07:34",
        "sampleReceivedDate": "04-Sep-2021 07:34",
        "sampleTestingDateAtLab": "04-Sep-2021 07:34",
        "sampleDispatchedOn": "04-Sep-2021 07:34",
        "resultDispatchedOn": "04-Sep-2021 07:34",
        "isSampleRejected": "yes",
        "rejectionReason": "3",
        "rejectionDate": "04-Sep-2021",
        "vlResult": "2.36",
        "vlResultAbsoluteDecimal": "0.37",
        "result": "",
        "revisedBy": "",
        "revisedOn": "",
        "reasonForVlResultChanges": "",
        "vlLog": "",
        "testedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "reviewedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "reviewedOn": "23-Sep-2021 14:01",
        "approvedBy": "1723ac39d1fe564254bdc56cb891a81e",
        "approvedOnDateTime": "23-Sep-2021 14:01",
        "labComments": "some commends",
        "resultStatus": "2",
        "fundingSource": "1",
        "implementingPartner": "1"
      }
    ]
  };

  static shrEncounter = {
    "resourceType": "Encounter",
    "id": "",
    "meta": {
      "tag": [
        {
          "system": "http://fhir.openmrs.org/ext/encounter-tag",
          "code": "encounter",
          "display": "Encounter"
        }
      ]
    },
    "contained": [
      {
        "resourceType": "Provenance",
        "id": "",
        "recorded": "2022-09-01T06:57:57.000+00:00",
        "activity": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystemv3-DataOperation",
              "code": "CREATE",
              "display": "create"
            }
          ]
        },
        "agent": [
          {
            "type": {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystemprovenance-participant-type",
                  "code": "author",
                  "display": "Author"
                }
              ]
            },
            "role": [
              {
                "coding": [
                  {
                    "system": "http://terminology.hl7.org/CodeSystemv3-ParticipationType",
                    "code": "AUT",
                    "display": "author"
                  }
                ]
              }
            ],
            "who": {
              "reference": "Practitioner/1172aa72-6323-441a-8ab3-58216eb6221b",
              "type": "Practitioner",
              "display": "Test Tester"
            }
          }
        ]
      }
    ],
    "status": "unknown",
    "class": {
      "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      "code": "AMB"
    },
    "type": [
      {
        "coding": [
          {
            "system": "http://fhir.openmrs.org/code-system/encounter-type",
            "code": "",
            "display": "LAB TEST - VLSM"
          }
        ]
      }
    ],
    "subject": {
      "reference": "Patient/a4765e9b-3aff-41a7-bfa5-45b498082eb7",
      "type": "Patient",
      "identifier": {
        "type": {
          "coding": [
            {
              "code": "UPID",
              "display": "UPID"
            }
          ]
        },
        "value": ""
      },
      "display": ""
    },
    "participant": [
      {
        "individual": {
          "reference": "Practitioner/b6206d1d-7e4e-4271-b0d5-438c306fc67f",
          "type": "Practitioner",
          "identifier": {
            "value": "{SYNCSERVERNAME}_4"
          },
          "display": "Test Tester (Identifier: {SYNCSERVERNAME}_4)"
        }
      }
    ],
    "period": {
      "start": "2022-09-01T06:57:57+00:00"
    },
    "location": [
      {
        "location": {
          "reference": "Location/cce25dfc-85e2-438e-9d86-e1918f48b0e8",
          "type": "Location",
          "identifier": {
            "value": "FOSAID: 1440  TYPE: Medical Clinic"
          },
          "display": "GLAMERC Policlinic"
        }
      }
    ]

  }

  static shrServiceRequest = {
    "resourceType": "ServiceRequest",
    "id": "",
    "status": "active",
    "intent": "order",
    "code": {
      "coding": [
        {
          "code": "fde88f7e-2798-11ed-a588-0050568c4eda",
          "display": "Miscellaneous National Jewish Health - 51991-8"
        }
      ]
    },
    "subject": {
      "reference": "Patient/a4765e9b-3aff-41a7-bfa5-45b498082eb7",
      "type": "Patient",
      "identifier": {
        "type": {
          "coding": [
            {
              "code": "UPID",
              "display": "UPID"
            }
          ]
        },
        "value": ""
      },
      "display": ""
    },
    "encounter": {
      "reference": "",
      "type": "Encounter"
    },
    "occurrencePeriod": {
      "start": ""
    },
    "requester": {
      "reference": "Practitioner/b6206d1d-7e4e-4271-b0d5-438c306fc67f",
      "type": "Practitioner",
      "identifier": {
        "value": "{SYNCSERVERNAME}_4"
      },
      "display": ""
    }

  }
}
module.exports = Constant;
