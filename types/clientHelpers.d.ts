import { Pipeline, HttpClient } from "@azure/core-rest-pipeline";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common";
/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
export declare function createDefaultPipeline(baseUrl: string, credential?: TokenCredential | KeyCredential, options?: ClientOptions): Pipeline;
export declare function getCachedDefaultHttpsClient(): HttpClient;
//# sourceMappingURL=clientHelpers.d.ts.map