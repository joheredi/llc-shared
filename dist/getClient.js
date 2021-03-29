"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const clientHelpers_1 = require("./clientHelpers");
const sendRequest_1 = require("./sendRequest");
const urlHelpers_1 = require("./urlHelpers");
function getClient(credentials, baseUrl, options = {}) {
    const pipeline = clientHelpers_1.createDefaultPipeline(baseUrl, credentials, options);
    pipeline.removePolicy({ name: "exponentialRetryPolicy" });
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
        };
    };
    return {
        path: client,
        pathUnckecked: client,
    };
}
exports.getClient = getClient;
