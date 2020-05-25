import urls from './urls';
import { generateGetRequest } from './request-generator';

export const videoAndDocumentRequests = (baseUrl) => {
    const arrayOfRequests = [];

    urls.resources.whitepapers.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    urls.resources.webinars.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    urls.resources.webinarsPages.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    return arrayOfRequests;
}

export const generateServiceRequests = (baseUrl) => {
    const arrayOfRequests = [];

    urls.services.manual.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    urls.services.auto.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    urls.services.special.array.forEach(url => {
        arrayOfRequests.push(generateGetRequest(baseUrl, url));
    });

    return arrayOfRequests;
}

export const generateAllUrls = (baseUrl) => {
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