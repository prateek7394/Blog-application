import axios from "axios";

// axios is used here to make an api call

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";
const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

// For request:
axiosInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params) {
      config.params = config.TYPE.params;
    }
    else if(config.TYPE.query) {
      config.url = config.url + '/' + config.TYPE.query;
    }
    console.log(config, "hello world");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// For response:
axiosInstance.interceptors.response.use(
  function (response) {
    // Stop loader here as we have got the response
    return processResponse(response);
  },
  function (error) {
    // Stop loader here also
    return Promise.reject(processError(error));
  }
);

// *******************
// If success -> return {isSuccess: true, data: Object}
// If failure --> return {isFailure: true, status: String, msg: String, code: int}
// *******************

const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      data: response.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    // Request made but server responded with status code
    // that falls out of the range of 200
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  }
  // NOTE: --> In other two cases backend doesn't receives the request

  else if (error.request) {
    // Request made but no response was received
    // Error occurred at backend side
    console.log("ERROR IN REQUEST: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something is wrong with front end setup
    // that triggers an error
    console.log("ERROR IN NETWORK: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

// Here we have created a common api for all the apis
const API = {};

// here key is userSignup and value is the object containing url and method

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? {} : body,
      responseType: value.responseType,
      TYPE: getType(value, body), // to check whether a param or a query and access its body
      headers: {
        authorization: getAccessToken()
      }
    });
}

export { API };
