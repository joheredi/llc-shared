import { PipelineResponse, RawHttpHeaders } from "@azure/core-rest-pipeline";

export type RequestParameters = {
  timeout?: number;
  headers?: RawHttpHeaders;
  body?: unknown;
  queryParameters?: { [key: string]: any };
  contentType?: string;
  /** Set to true if the request is sent over HTTP instead of HTTPS */
  allowInsecureConnection?: boolean;
};

export type PathUncheckedResponse = PipelineResponse & { body: any };

export type RouteParams<
  TRoute extends string
> = TRoute extends `{${infer _Param}}/${infer Tail}`
  ? [pathParam: string, ...pathParams: RouteParams<Tail>]
  : TRoute extends `{${infer _Param}}`
  ? [pathParam: string]
  : TRoute extends `${infer _Prefix}:${infer Tail}`
  ? RouteParams<`{${Tail}}`>
  : [];

export type PathUncheckedClient = <T extends string>(
  path: T,
  ...args: RouteParams<T>
) => {
  post(options?: RequestParameters): Promise<PathUncheckedResponse>;
  put(options?: RequestParameters): Promise<PathUncheckedResponse>;
  patch(options?: RequestParameters): Promise<PathUncheckedResponse>;
  get(options?: RequestParameters): Promise<PathUncheckedResponse>;
  delete(options?: RequestParameters): Promise<PathUncheckedResponse>;
};
