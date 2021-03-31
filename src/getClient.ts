import {
  isTokenCredential,
  KeyCredential,
  TokenCredential,
} from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-rest-pipeline";
import { createDefaultPipeline } from "./clientHelpers";
import { HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
import { sendRequest } from "./sendRequest";
import { buildRequestUrl } from "./urlHelpers";

export interface Client {
  path: (
    path: string,
    ...args: Array<any>
  ) => {
    get: (options?: RequestParameters) => Promise<HttpResponse>;
    post: (options?: RequestParameters) => Promise<HttpResponse>;
    put: (options?: RequestParameters) => Promise<HttpResponse>;
    patch: (options?: RequestParameters) => Promise<HttpResponse>;
    delete: (options?: RequestParameters) => Promise<HttpResponse>;
  };
  pathUnchecked: (
    path: string,
    ...args: Array<any>
  ) => {
    get: (options?: RequestParameters) => Promise<HttpResponse>;
    post: (options?: RequestParameters) => Promise<HttpResponse>;
    put: (options?: RequestParameters) => Promise<HttpResponse>;
    patch: (options?: RequestParameters) => Promise<HttpResponse>;
    delete: (options?: RequestParameters) => Promise<HttpResponse>;
  };
}

export function getClient(baseUrl: string, options?: PipelineOptions): Client;
export function getClient(
  baseUrl: string,
  credentials?: TokenCredential | KeyCredential,
  options?: PipelineOptions
): Client;
export function getClient(
  baseUrl: string,
  credentialsOrPipelineOptions:
    | (TokenCredential | KeyCredential)
    | PipelineOptions,
  opts: PipelineOptions = {}
): Client {
  let credentials: TokenCredential | KeyCredential | undefined;
  let options = opts;

  if (isCredential(credentialsOrPipelineOptions)) {
    credentials = credentialsOrPipelineOptions;
    options = opts;
  } else {
    options = credentialsOrPipelineOptions || {};
  }
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
    pathUnchecked: client,
  };
}

function isCredential(
  param: (TokenCredential | KeyCredential) | PipelineOptions
): param is TokenCredential | KeyCredential {
  if ((param as any).key || isTokenCredential(param)) {
    return true;
  }

  return false;
}
