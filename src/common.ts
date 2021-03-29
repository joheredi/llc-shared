import {
  PipelineOptions,
  PipelineRequest,
  RawHttpHeaders,
} from "@azure/core-rest-pipeline";

export type ClientOptions = PipelineOptions & {
  credentials?: {
    scopes?: string | string[];
    apiKeyHeaderName?: string;
  };
  baserUrl?: string;
};

export type HttpResponse = {
  /**
   * The request that generated this response.
   */
  request: PipelineRequest;
  /**
   * The HTTP status code of the response.
   */
  status: number;
  /**
   * The HTTP response headers.
   */
  headers: RawHttpHeaders;
  /**
   * Parsed body
   */
  body: any;
  /**
   * The response body as text (string format)
   */
  bodyAsText?: string | null;
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always undefined in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always undefined in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};
