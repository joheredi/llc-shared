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
function sendRequest(method, url, pipeline, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpClient = clientHelpers_1.getCachedDefaultHttpsClient();
        const headers = core_rest_pipeline_1.createHttpHeaders(Object.assign({ accept: "application/json", "content-type": options.contentType || getContentType(options.body) }, (options.headers ? options.headers : {})));
        let body = undefined;
        if (options.body) {
            body = JSON.stringify(options.body);
        }
        const request = core_rest_pipeline_1.createPipelineRequest({
            url: url.toString(),
            method,
            body,
            headers,
            allowInsecureConnection: options.allowInsecureConnection,
        });
        const result = yield pipeline.sendRequest(httpClient, request);
        let rawHeaders = {};
        for (const [key, value] of result.headers) {
            rawHeaders[key] = value;
        }
        let parsedBody = undefined;
        try {
            parsedBody = JSON.parse(result.bodyAsText);
        }
        catch (_a) {
            parsedBody = undefined;
        }
        return {
            bodyAsText: result.bodyAsText,
            request,
            headers: rawHeaders,
            status: result.status,
            body: parsedBody,
        };
    });
}
exports.sendRequest = sendRequest;
function getContentType(body) {
    if (!body) {
        return undefined;
    }
    try {
        JSON.parse(body);
        return "application/json; charset=UTF-8";
    }
    catch (_a) { }
    if (typeof body === "string") {
        return "text/plain";
    }
    if (ArrayBuffer.isView(body)) {
        return "application/octet-stream";
    }
    // Default, we may want to log a warning
    return "application/json; charset=UTF-8";
}
