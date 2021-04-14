"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const core_auth_1 = require("@azure/core-auth");
const clientHelpers_1 = require("./clientHelpers");
const sendRequest_1 = require("./sendRequest");
const urlHelpers_1 = require("./urlHelpers");
function getClient(baseUrl, credentialsOrPipelineOptions, options = {}) {
    let credentials;
    let clientOptions = options;
    if (credentialsOrPipelineOptions) {
        if (isCredential(credentialsOrPipelineOptions)) {
            credentials = credentialsOrPipelineOptions;
            clientOptions = options;
        }
        else {
            clientOptions = credentialsOrPipelineOptions || {};
        }
    }
    const pipeline = clientHelpers_1.createDefaultPipeline(baseUrl, credentials, clientOptions);
    const client = (path, ...args) => {
        return {
            get: (options = {}) => {
                return buildSendRequest("GET", clientOptions, baseUrl, path, pipeline, options, args);
            },
            post: (options = {}) => {
                return buildSendRequest("POST", clientOptions, baseUrl, path, pipeline, options, args);
            },
            put: (options = {}) => {
                return buildSendRequest("PUT", clientOptions, baseUrl, path, pipeline, options, args);
            },
            patch: (options = {}) => {
                return buildSendRequest("PATCH", clientOptions, baseUrl, path, pipeline, options, args);
            },
            delete: (options = {}) => {
                return buildSendRequest("DELETE", clientOptions, baseUrl, path, pipeline, options, args);
            },
            head: (options = {}) => {
                return buildSendRequest("HEAD", clientOptions, baseUrl, path, pipeline, options, args);
            },
            options: (options = {}) => {
                return buildSendRequest("OPTIONS", clientOptions, baseUrl, path, pipeline, options, args);
            },
            trace: (options = {}) => {
                return buildSendRequest("TRACE", clientOptions, baseUrl, path, pipeline, options, args);
            },
        };
    };
    return {
        path: client,
        pathUnchecked: client,
    };
}
exports.getClient = getClient;
function buildSendRequest(method, clientOptions, baseUrl, path, pipeline, requestOptions = {}, args = []) {
    var _a;
    // If the client has an api-version and the request doesn't specify one, inject the one in the client options
    if (!((_a = requestOptions.queryParameters) === null || _a === void 0 ? void 0 : _a["api-version"]) &&
        clientOptions.apiVersion) {
        if (!requestOptions.queryParameters) {
            requestOptions.queryParameters = {};
        }
        requestOptions.queryParameters["api-version"] = clientOptions.apiVersion;
    }
    const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, requestOptions);
    return sendRequest_1.sendRequest(method, url, pipeline, requestOptions);
}
function isCredential(param) {
    if (param.key !== undefined || core_auth_1.isTokenCredential(param)) {
        return true;
    }
    return false;
}
