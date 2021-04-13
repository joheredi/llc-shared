"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequestUrl = void 0;
const url_1 = require("./url");
/**
 * Builds the request url, filling in query and path parameters
 * @param baseUrl base url which can be a template url
 * @param routePath path to append to the baseUrl
 * @param pathParameters values of the path parameters
 * @param options request parameters including query parameters
 * @returns a full url with path and query parameters
 */
function buildRequestUrl(baseUrl, routePath, pathParameters, options = {}) {
    let path = routePath;
    if (path.startsWith("https://") || path.startsWith("http://")) {
        return path;
    }
    for (const pathParam of pathParameters) {
        path = path.replace(/{([^\/]+)}/, pathParam);
    }
    const url = new url_1.URL(`${baseUrl}/${path}`);
    if (options.queryParameters) {
        const queryParams = options.queryParameters;
        for (const key of Object.keys(queryParams)) {
            const param = queryParams[key];
            if (!param.toString || typeof param.toString !== "function") {
                throw new Error(`Query parameters must be able to be represented as string, ${key} can't`);
            }
            url.searchParams.append(key, param.toString());
        }
    }
    return (url
        .toString()
        // Remove double forward slashes
        .replace(/([^:]\/)\/+/g, "$1"));
}
exports.buildRequestUrl = buildRequestUrl;
