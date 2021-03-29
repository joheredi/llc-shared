import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { sendRequest } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

export function getClient(
  credentials: TokenCredential | KeyCredential,
  baseUrl: string,
  options: PipelineOptions = {}
) {
  const pipeline = createDefaultPipeline(baseUrl, credentials, options);
  pipeline.removePolicy({ name: "exponentialRetryPolicy" });
  const client = (path: string, ...args: Array<any>) => {
    return {
      get: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("GET", url, pipeline, options);
      },
      post: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("POST", url, pipeline, options);
      },
      put: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("PUT", url, pipeline, options);
      },
      patch: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("PATCH", url, pipeline, options);
      },
      delete: (options: RequestParameters = {}): Promise<HttpResponse> => {
        const url = buildRequestUrl(baseUrl, path, args, options);
        return sendRequest("DELETE", url, pipeline, options);
      },
    };
  };

  return {
    path: client,
    pathUnckecked: client,
  };
}
