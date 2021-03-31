import {
  createHttpHeaders,
  createPipelineRequest,
  HttpMethods,
  Pipeline,
  RawHttpHeaders,
} from "@azure/core-rest-pipeline";
import { getCachedDefaultHttpsClient } from "./clientHelpers";
import { RequestParameters } from "./pathClientTypes";
import { HttpResponse } from "./common";

export async function sendRequest(
  method: HttpMethods,
  url: string,
  pipeline: Pipeline,
  options?: RequestParameters
): Promise<HttpResponse> {
  const httpClient = getCachedDefaultHttpsClient();

  const headers = createHttpHeaders({
    accept: "application/json",
    "content-type": options.contentType || getContentType(options.body),
    ...(options.headers ? options.headers : {}),
  });

  const body = JSON.stringify(options.body);

  const request = createPipelineRequest({
    url: url.toString(),
    method,
    body,
    headers,
    allowInsecureConnection: options.allowInsecureConnection,
  });

  const result = await pipeline.sendRequest(httpClient, request);
  let rawHeaders: RawHttpHeaders = {};
  for (const [key, value] of result.headers) {
    rawHeaders[key] = value;
  }

  let parsedBody = undefined;

  try {
    parsedBody = JSON.parse(result.bodyAsText);
  } catch {
    parsedBody = undefined;
  }

  return {
    bodyAsText: result.bodyAsText,
    request,
    headers: rawHeaders,
    status: result.status,
    body: parsedBody,
  };
}

function getContentType(body: any) {
  if (!body) {
    return undefined;
  }
  try {
    JSON.parse(body);
    return "application/json; charset=UTF-8";
  } catch {}

  if (typeof body === "string") {
    return "text/plain";
  }

  if (ArrayBuffer.isView(body)) {
    return "application/octet-stream";
  }

  // Default, we may want to log a warning
  return "application/json; charset=UTF-8";
}
