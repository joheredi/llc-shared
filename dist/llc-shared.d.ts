/// <reference types="node" />
import { HttpClient } from '@azure/core-rest-pipeline';
import { HttpMethods } from '@azure/core-rest-pipeline';
import { KeyCredential } from '@azure/core-auth';
import { Pipeline } from '@azure/core-rest-pipeline';
import { PipelineOptions } from '@azure/core-rest-pipeline';
import { PipelinePolicy } from '@azure/core-rest-pipeline';
import { PipelineRequest } from '@azure/core-rest-pipeline';
import { PipelineResponse } from '@azure/core-rest-pipeline';
import { RawHttpHeaders } from '@azure/core-rest-pipeline';
import { TokenCredential } from '@azure/core-auth';

export declare function buildRequestUrl(baseUrl: string, routePath: string, pathParameters: string[], options?: RequestParameters): string;

export declare type ClientOptions = PipelineOptions & {
    credentials?: {
        scopes?: string | string[];
        apiKeyHeaderName?: string;
    };
    baserUrl?: string;
};

export declare function createDefaultPipeline(baseUrl: string, credential: TokenCredential | KeyCredential, options?: ClientOptions): Pipeline;

export declare function getCachedDefaultHttpsClient(): HttpClient;

export declare function getClient(credentials: TokenCredential | KeyCredential, baseUrl: string, options?: PipelineOptions): {
    path: (path: string, ...args: Array<any>) => {
        get: (options?: RequestParameters) => Promise<HttpResponse>;
        post: (options?: RequestParameters) => Promise<HttpResponse>;
        put: (options?: RequestParameters) => Promise<HttpResponse>;
        patch: (options?: RequestParameters) => Promise<HttpResponse>;
        delete: (options?: RequestParameters) => Promise<HttpResponse>;
    };
    pathUnckecked: (path: string, ...args: Array<any>) => {
        get: (options?: RequestParameters) => Promise<HttpResponse>;
        post: (options?: RequestParameters) => Promise<HttpResponse>;
        put: (options?: RequestParameters) => Promise<HttpResponse>;
        patch: (options?: RequestParameters) => Promise<HttpResponse>;
        delete: (options?: RequestParameters) => Promise<HttpResponse>;
    };
};

export declare type HttpResponse = {
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

export declare function keyCredentialAuthenticationPolicy(credential: KeyCredential, apiKeyHeaderName: string): PipelinePolicy;

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export declare const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";

export declare type LroRouteParams<TRoute extends string> = TRoute extends `:${infer _Param}/${infer Tail}` ? [pathParam: string, ...pathParams: RouteParams<Tail>] : TRoute extends `:${infer _Param}` ? [pathParam: string] : TRoute extends `${infer _Prefix}:${infer Tail}` ? RouteParams<`:${Tail}`> : [];

export declare type PathUncheckedClient = <T extends string>(path: T, ...args: RouteParams<T>) => {
    post(options?: RequestParameters): Promise<PathUncheckedResponse>;
    put(options?: RequestParameters): Promise<PathUncheckedResponse>;
    patch(options?: RequestParameters): Promise<PathUncheckedResponse>;
    get(options?: RequestParameters): Promise<PathUncheckedResponse>;
    delete(options?: RequestParameters): Promise<PathUncheckedResponse>;
};

export declare type PathUncheckedResponse = PipelineResponse & {
    body: any;
};

export declare type RequestParameters = {
    timeout?: number;
    headers?: RawHttpHeaders;
    body?: unknown;
    queryParameters?: {
        [key: string]: any;
    };
    contentType?: string;
};

export declare type RouteParams<TRoute extends string> = TRoute extends `:${infer _Param}/${infer Tail}` ? [pathParam: string, ...pathParams: RouteParams<Tail>] : TRoute extends `:${infer _Param}` ? [pathParam: string] : TRoute extends `${infer _Prefix}:${infer Tail}` ? RouteParams<`:${Tail}`> : [];

export declare function sendRequest(method: HttpMethods, url: string, pipeline: Pipeline, options?: RequestParameters): Promise<HttpResponse>;

export { }
