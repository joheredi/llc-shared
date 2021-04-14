import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-rest-pipeline";
import { ClientOptions, HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
/**
 * Type to use with pathUnchecked, overrides the body type to any to allow flexibility
 */
export declare type PathUncheckedResponse = HttpResponse & {
    body: any;
};
/**
 * Shape of a Rest Level Client
 */
export interface Client {
    /**
     * This method will be used to send request that would check the path to provide
     * strong types
     */
    path: unknown;
    /**
     * This method allows arbitrary paths and doesn't provide strong types
     */
    pathUnchecked: (path: string, ...args: Array<any>) => {
        get: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        post: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        put: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        patch: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        delete: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        head: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        options: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
        trace: (options?: RequestParameters) => Promise<PathUncheckedResponse>;
    };
}
/**
 * Creates a client with a default pipeline
 * @param baseUrl Base endpoint for the client
 * @param options Client options
 */
export declare function getClient(baseUrl: string, options?: PipelineOptions): Client;
/**
 * Creates a client with a default pipeline
 * @param baseUrl Base endpoint for the client
 * @param credentials Credentials to authenticate the requests
 * @param options Client options
 */
export declare function getClient(baseUrl: string, credentials?: TokenCredential | KeyCredential, options?: ClientOptions): Client;
//# sourceMappingURL=getClient.d.ts.map