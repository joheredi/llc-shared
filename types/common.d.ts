import { PipelineOptions, RawHttpHeaders, PipelineRequest } from "@azure/core-rest-pipeline";
/**
 * General options that a Rest Level Client can take
 */
export declare type ClientOptions = PipelineOptions & {
    credentials?: {
        scopes?: string | string[];
        apiKeyHeaderName?: string;
    };
    baseUrl?: string;
    /**
     * Options for setting a custom apiVersion.
     */
    apiVersion?: string;
};
/**
 * Represents the shape of an HttpResponse
 */
export declare type HttpResponse = {
    /**
     * The request that generated this response.
     */
    request: PipelineRequest;
    /**
     * The HTTP response headers.
     */
    headers: RawHttpHeaders;
    /**
     * Parsed body
     */
    body: unknown;
    /**
     * The HTTP status code of the response.
     */
    status: string;
};
//# sourceMappingURL=common.d.ts.map