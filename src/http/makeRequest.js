import axios from 'axios';

const baseURL = '/fly.json'

export default ({ apiUrl = '/', method = 'get', params = {}, data = {}, headers = {} }) =>
    axios({ baseURL, url: apiUrl, method, params, data, headers });
