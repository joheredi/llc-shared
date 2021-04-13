"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedDefaultHttpsClient = exports.createDefaultPipeline = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_auth_1 = require("@azure/core-auth");
const keyCredentialAuthenticationPolicy_1 = require("./keyCredentialAuthenticationPolicy");
let cachedHttpClient;
/**
 * Creates a default rest pipeline to re-use accross Rest Level Clients
 */
function createDefaultPipeline(baseUrl, credential, options = {}) {
    var _a, _b, _c, _d;
    const pipeline = core_rest_pipeline_1.createPipelineFromOptions(options);
    pipeline.removePolicy({ name: "exponentialRetryPolicy" });
    if (credential) {
        let credentialPolicy;
        if (core_auth_1.isTokenCredential(credential)) {
            credentialPolicy = core_rest_pipeline_1.bearerTokenAuthenticationPolicy({
                credential,
                scopes: (_b = (_a = options.credentials) === null || _a === void 0 ? void 0 : _a.scopes) !== null && _b !== void 0 ? _b : `${baseUrl}/.default`,
            });
        }
        else {
            if (!((_c = options.credentials) === null || _c === void 0 ? void 0 : _c.apiKeyHeaderName)) {
                throw new Error(`Missing API Key Header Name`);
            }
            credentialPolicy = keyCredentialAuthenticationPolicy_1.keyCredentialAuthenticationPolicy(credential, (_d = options.credentials) === null || _d === void 0 ? void 0 : _d.apiKeyHeaderName);
        }
        pipeline.addPolicy(credentialPolicy);
    }
    return pipeline;
}
exports.createDefaultPipeline = createDefaultPipeline;
function getCachedDefaultHttpsClient() {
    if (!cachedHttpClient) {
        cachedHttpClient = core_rest_pipeline_1.createDefaultHttpClient();
    }
    return cachedHttpClient;
}
exports.getCachedDefaultHttpsClient = getCachedDefaultHttpsClient;
