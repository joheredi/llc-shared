"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const clientHelpers_1 = require("./clientHelpers");
/**
 * Helper function to send request used by the client
 * @param method method to use to send the request
 * @param url url to send the request to
 * @param pipeline pipeline with the policies to run when sending the request
 * @param options request options
 * @returns returns and HttpResponse
 */
function sendRequest(method, url, pipeline, options = {}) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const httpClient = clientHelpers_1.getCachedDefaultHttpsClient();
        const body = options.body !== undefined ? JSON.stringify(options.body) : undefined;
        const headers = core_rest_pipeline_1.createHttpHeaders(Object.assign(Object.assign({ accept: (_a = options.accept) !== null && _a !== void 0 ? _a : "application/json" }, (body !== undefined && {
            "content-type": (_b = options.contentType) !== null && _b !== void 0 ? _b : getContentType(options.body),
        })), (options.headers ? options.headers : {})));
        const request = core_rest_pipeline_1.createPipelineRequest({
            url,
            method,
            body,
            headers,
            allowInsecureConnection: options.allowInsecureConnection,
        });
        const result = yield pipeline.sendRequest(httpClient, request);
        const rawHeaders = result.headers.toJSON();
        let parsedBody = undefined;
        try {
            parsedBody = result.bodyAsText ? JSON.parse(result.bodyAsText) : undefined;
        }
        catch (_c) {
            parsedBody = undefined;
        }
        return {
            request,
            headers: rawHeaders,
            status: `${result.status}`,
            body: parsedBody,
        };
    });
}
exports.sendRequest = sendRequest;
/**
 * Function to determine the content-type of a body
 * this is used if an explicit content-type is not provided
 * @param body body in the request
 * @returns returns the content-type
 */
function getContentType(body) {
    if (ArrayBuffer.isView(body)) {
        return "application/octet-stream";
    }
    // By default return json
    return "application/json; charset=UTF-8";
}
