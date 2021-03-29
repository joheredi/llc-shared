import { HttpMethods, Pipeline } from "@azure/core-rest-pipeline";
import { RequestParameters } from "./pathClientTypes";
import { HttpResponse } from "./common";
export declare function sendRequest(method: HttpMethods, url: string, pipeline: Pipeline, options?: RequestParameters): Promise<HttpResponse>;
//# sourceMappingURL=sendRequest.d.ts.map