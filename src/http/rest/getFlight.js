import makeRequest from "../makeRequest";

export const getFlight = () =>
    makeRequest({
        method: 'GET'
    })