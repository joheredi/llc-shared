import { HttpMethods, Pipeline } from "@azure/core-rest-pipeline";
import { RequestParameters } from "./pathClientTypes";
import { HttpResponse } from "./common";
/**
 * Helper function to send request used by the client
 * @param method method to use to send the request
 * @param url url to send the request to
 * @param pipeline pipeline with the policies to run when sending the request
 * @param options request options
 * @returns returns and HttpResponse
 */
export declare function sendRequest(method: HttpMethods, url: string, pipeline: Pipeline, options?: RequestParameters): Promise<HttpResponse>;
//# sourceMappingURL=sendRequest.d.ts.map