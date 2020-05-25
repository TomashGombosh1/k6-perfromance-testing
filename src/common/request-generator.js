export const generateGetRequest = (baseUrl, urls) => {
    const batch = [];
    urls.array.forEach(url => {
        batch.push("GET", `${baseUrl}${url}`, null, null);
    });
    return batch;
}