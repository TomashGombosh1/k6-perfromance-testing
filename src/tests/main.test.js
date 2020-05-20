import { sleep } from 'k6';
import { Rate } from 'k6/metrics';
import http from 'k6/http';

const baseUrl = 'https://qatestlab.com/resources';
const urls = {
  form: `${baseUrl}/form`,
  submit: `${baseUrl}/form/subscribe`,
};

export const options = {
    vus: 30,
    duration: '10s',
    thresholds: {
      'failed form submits': ['rate<0.1'],
      'failed form fetches': ['rate<0.1'],
      'http_req_duration': ['p(95)<400'],
    },
}

const getUrl = () => {
    const formResult = http.get(baseUrl);
    formFailRate.add(formResult.status !== 200);
}

export default function() {
    getUrl();
  }