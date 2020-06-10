import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    // Request should be made ingress
    return axios.create({
      // We are accessing the service from within the namespace
      // Using the IP is the better option
      baseURL: 'http://172.17.0.2/',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
