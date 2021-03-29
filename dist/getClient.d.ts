import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-rest-pipeline";
import { HttpResponse } from "./common";
import { RequestParameters } from "./pathClientTypes";
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
//# sourceMappingURL=getClient.d.ts.map