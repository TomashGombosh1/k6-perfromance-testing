import { Rate, Trend } from 'k6/metrics';
import { check } from "k6";
import http from 'k6/http';

const baseUrl = "https://qatestlab.com/";
var errors = new Rate("errors");
var trends = new Trend("trends");

export const options = {
    vus: 100,
    duration: '500s',
    errorRate: [
      { 
        threshold: 'rate < 0.1', 
        abortOnFail: true, 
        delayAbortEval: '1m' 
      }
    ]
}

export default function () {
  http.batch(generateAllUrls(baseUrl))
    .forEach(res => {
      check(res, {
        "is status 200": (r) => r.status === 200
      });
      errors.add(res.error_code);
      trends.add(res.timings.sending + res.timings.receiving);
  })
}

const generateAllUrls = (baseUrl) => {
  const arrayOfRequests = [];
  Object.entries(urls).map(([keys, value]) => {
      Object.entries(value).map(([keys, value]) => {
        value.forEach(url => {
          arrayOfRequests.push(generateGetRequest(baseUrl, url))
        })
      })
  }); 
  return arrayOfRequests;
}

const urls = {
  main : {
      main : [
          "/",
          "/why-qatestlab",
          "/company/contacts/"
      ]
  },

  services: {
      manual : [
          "/services/manual-testing/functional-testing",
          "/services/manual-testing/regression-testing",
          "/services/manual-testing/ux-usability-testing",
          "/services/manual-testing/compatibility-testing",
          "/services/manual-testing/configuration-testing",
          "/services/manual-testing/system-testing",
          "/services/manual-testing/localization-testing",
          "/services/manual-testing/gui-testing",
      ],
      auto : [
          "/services/test-automation/performance-testing",
          "/services/test-automation/penetration-testing"
      ],
      special : [
          "/services/special-offer/magento-test-suite",
          "/special-offer/online-music-streaming",
          "/services/special-offer/voice-technologies/"
      ]
  },
  resources : {
      whitepapers : [
          "/future-of-mobile-automation", 
          "/assets/Uploads/Whitepaper.-Guide-to-Test-Automation-Tools-2017.pdf",
          "/assets/Independent-Testing-Providers-vs.-Software-Houses-Quick-Guide-to-selecting-a-proper-vendor.pdf"
      ],
      webinars : [
          "/resources/webinars/independent-testing-crm",
          "/resources/webinars/automated-testing-future",
          "/resources/webinars/what-we-learned",
          "/resources/webinars/qa-process-startup",
          "/resources/webinars/it-business-opportunities",
          "/resources/webinars/testing-without-testers",
          "/resources/webinars/automation-too-late",
          "/resources/webinars/test-case-management",
          "/resources/webinars/hybrid-mobile-strategy",
          "/resources/webinars/measure-code-coverage"
      ],
      webinarsPages : [
          "resources/webinars/page-2",
          "resources/webinars/page-3",
          "resources/webinars/page-4",
          "resources/webinars/page-5",
          "resources/webinars/page-6"
      ]
  }
}

const generateGetRequest = (baseUrl, url) => {
  const batch = [];
  batch.push("GET");
  batch.push(`${baseUrl}${url}`);
  return batch;
}