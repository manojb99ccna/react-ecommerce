import axios from 'axios';
import Emitter from '../Events/Emitter';
import EventName from '../Events/EventName'; 
import StringUtils from '../utility/StringUtils';


export const Client = {
  
    unauthorized: (error, callback, errorCallback) => {

        if (error.response) {
            if (error.response.status === 401) {
                console.log('LOGOUTE IF');

            } else if(error.response.status === 204) {
                callback();
            
            } else if(error.response.status === 404) {
                callback();
           
            } else if(error.response.status === 304) {
                callback();

            } else if(error.response.status === 400) {
                console.log('ERROR',error.response);
                errorCallback(error);
            }
            else if(error.response.status === 405) {
                console.log('ERROR',error.response);
                errorCallback(error);
            }

        } else if (error.request) {
            callback();
            
            
        } else {
           
            console.log('LOGOUTE ELSE', error);
           
        }


        
    },

    postWithLoader: (endpoint, input, isBearer, successCallback, failureCallback = () => { }) => {
        Emitter.emit(EventName.GLOBAL_LOADER.SHOW);
        axios.post(endpoint, input, Client.getHeaders(isBearer))
            .then((response) => {
                Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
                successCallback(response);
            })
            .catch(function (error) {
                console.log('LOGOUTE postWithLoader', endpoint);
                Client.unauthorized(error, successCallback, failureCallback);
                Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
                // handle error
                console.log(error);
                failureCallback(error);
            })
    },

    post: (endpoint, input, isBearer, successCallback, failureCallback = () => { }) => {
        const header = Client.getHeaders(isBearer);
        if (StringUtils.isNotEmpty(header)) {
            header.headers['Content-Type'] = 'application/json';
        }
        
        axios.post(endpoint, input, header)
            .then((response) => {
                successCallback(response);
            })
            .catch(function (error) {
                console.log('LOGOUTE post', endpoint);
                Client.unauthorized(error, successCallback, failureCallback);
                console.log(error);
                failureCallback(error);
            })
    },

    getWithLoader: (endpoint, successCallback , failureCallback = () => { }) => { 
        Emitter.emit(EventName.GLOBAL_LOADER.SHOW); 
        axios.get(endpoint).then((response) => {
            Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
            successCallback(response);
        })
        .catch(function (error) {
            console.log('LOGOUTE getWithLoader', endpoint);
            Client.unauthorized(error, successCallback, failureCallback);
            Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
            // handle error
            console.log(error);
            failureCallback(error, failureCallback);
        })
    },

    get: (endpoint, isBearer, successCallback , failureCallback = () => { }) => {
        axios.get(endpoint, Client.getHeaders(isBearer))
            .then((response) => {
                successCallback(response);
            })
            .catch(function (error) {
                console.log('LOGOUTE get', endpoint);
                Client.unauthorized(error, successCallback, failureCallback);
                console.log(error);
                failureCallback(error);
            })
    },

    getAll: (endPoints, isBearer, successCallback, failureCallback = () => {}) => {

        const getEndpoints = [];
        endPoints.forEach(element => {
            getEndpoints.push(axios.get(element, Client.getHeaders(isBearer)).catch(err => null));
        });

        axios.all(getEndpoints).then(axios.spread(function () {
            successCallback(arguments);
        })).catch(function (error) {
            console.log('LOGOUTE getall', endPoints);
            Client.unauthorized(error, successCallback);
            failureCallback();            
        });
    },

    getAllWithLoader: (endPoints, isBearer, successCallback, failureCallback = () => {}) => {
        Emitter.emit(EventName.GLOBAL_LOADER.SHOW);
        const getEndpoints = [];
        endPoints.forEach(element => {
            getEndpoints.push(axios.get(element, Client.getHeaders(isBearer)).catch(err => null));
        });

        axios.all(getEndpoints).then(axios.spread(function () {
            Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
            successCallback(arguments);
        })).catch(function (error) {
            console.log('LOGOUTE getAllWithLoader', endPoints);
            Emitter.emit(EventName.GLOBAL_LOADER.HIDE);
            Client.unauthorized(error, successCallback);
            failureCallback();            
        });
    },

    getIMO: (endpoint, token, successCallback , failureCallback = () => { }) => {
        const header = {
            headers: {
                Authorization: 'Basic '+ token
            } 
        };

        axios.get(endpoint, header)
            .then((response) => {
                successCallback(response);
            })
            .catch(function (error) {
                console.log('LOGOUTE getIMO', endpoint);
                Client.unauthorized(error, successCallback, failureCallback);
                console.log(error);
                failureCallback(error);
            })
    },

    postIMO: (endpoint, input, token, successCallback , failureCallback = () => { }) => {
        const header = {
            headers: {
                Authorization: 'Basic '+ token,
                'Content-Type': 'application/json'
            } 
        };

        axios.post(endpoint, input, header)
            .then((response) => {
                successCallback(response);
            })
            .catch(function (error) {
                console.log('LOGOUTE postIMO', endpoint);
                Client.unauthorized(error, successCallback, failureCallback);
                console.log(error);
                failureCallback(error);
            })
    },

    audit: (endpoint, inputs, isBearer, successCallback, failureCallback = () => { }) => {
        const header = Client.getHeaders(isBearer);
        if (StringUtils.isNotEmpty(header)) {
            header.headers['Content-Type'] = 'application/json';
        } 

        axios.post(endpoint, inputs, header).then((response) => { 
            }).catch(function (error) {  })
    },
}
