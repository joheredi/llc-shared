import { RequestParameters } from "./pathClientTypes";
/**
 * Builds the request url, filling in query and path parameters
 * @param baseUrl base url which can be a template url
 * @param routePath path to append to the baseUrl
 * @param pathParameters values of the path parameters
 * @param options request parameters including query parameters
 * @returns a full url with path and query parameters
 */
export declare function buildRequestUrl(baseUrl: string, routePath: string, pathParameters: string[], options?: RequestParameters): string;
//# sourceMappingURL=urlHelpers.d.ts.map