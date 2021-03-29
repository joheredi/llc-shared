import { Pipeline, HttpClient, PipelinePolicy } from "@azure/core-rest-pipeline";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ClientOptions } from "./common";
export declare function createDefaultPipeline(baseUrl: string, credential: TokenCredential | KeyCredential, options?: ClientOptions): Pipeline;
export declare function getCachedDefaultHttpsClient(): HttpClient;
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export declare const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";
export declare function keyCredentialAuthenticationPolicy(credential: KeyCredential, apiKeyHeaderName: string): PipelinePolicy;
//# sourceMappingURL=clientHelpers.d.ts.map