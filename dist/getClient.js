"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const core_auth_1 = require("@azure/core-auth");
const clientHelpers_1 = require("./clientHelpers");
const sendRequest_1 = require("./sendRequest");
const urlHelpers_1 = require("./urlHelpers");
function getClient(baseUrl, credentialsOrPipelineOptions, opts = {}) {
    let credentials;
    let options = opts;
    if (credentialsOrPipelineOptions) {
        if (isCredential(credentialsOrPipelineOptions)) {
            credentials = credentialsOrPipelineOptions;
            options = opts;
        }
        else {
            options = credentialsOrPipelineOptions || {};
        }
    }
    const pipeline = clientHelpers_1.createDefaultPipeline(baseUrl, credentials, options);
    const client = (path, ...args) => {
        return {
            get: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("GET", url, pipeline, options);
            },
            post: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("POST", url, pipeline, options);
            },
            put: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("PUT", url, pipeline, options);
            },
            patch: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("PATCH", url, pipeline, options);
            },
            delete: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("DELETE", url, pipeline, options);
            },
            head: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("HEAD", url, pipeline, options);
            },
            options: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("OPTIONS", url, pipeline, options);
            },
            trace: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest_1.sendRequest("TRACE", url, pipeline, options);
            },
        };
    };
    return {
        path: client,
        pathUnchecked: client,
    };
}
exports.getClient = getClient;
function isCredential(param) {
    if (param.key !== undefined || core_auth_1.isTokenCredential(param)) {
        return true;
    }
    return false;
}
