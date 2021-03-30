"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyCredentialAuthenticationPolicy = exports.keyCredentialAuthenticationPolicyName = exports.getCachedDefaultHttpsClient = exports.createDefaultPipeline = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
const core_auth_1 = require("@azure/core-auth");
let cachedHttpsClient;
const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
function createDefaultPipeline(baseUrl, credential, options = {}) {
    var _a, _b;
    const pipeline = core_rest_pipeline_1.createPipelineFromOptions(options);
    if (credential) {
        const credentialPolicy = core_auth_1.isTokenCredential(credential)
            ? core_rest_pipeline_1.bearerTokenAuthenticationPolicy({
                credential,
                scopes: ((_a = options.credentials) === null || _a === void 0 ? void 0 : _a.scopes) || `${baseUrl}/.default`,
            })
            : keyCredentialAuthenticationPolicy(credential, ((_b = options.credentials) === null || _b === void 0 ? void 0 : _b.apiKeyHeaderName) || API_KEY_HEADER_NAME);
        pipeline.addPolicy(credentialPolicy);
    }
    return pipeline;
}
exports.createDefaultPipeline = createDefaultPipeline;
function getCachedDefaultHttpsClient() {
    if (!cachedHttpsClient) {
        cachedHttpsClient = core_rest_pipeline_1.createDefaultHttpClient();
    }
    return cachedHttpsClient;
}
exports.getCachedDefaultHttpsClient = getCachedDefaultHttpsClient;
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
exports.keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";
function keyCredentialAuthenticationPolicy(credential, apiKeyHeaderName) {
    return {
        name: exports.keyCredentialAuthenticationPolicyName,
        sendRequest(request, next) {
            return __awaiter(this, void 0, void 0, function* () {
                request.headers.set(apiKeyHeaderName, credential.key);
                return next(request);
            });
        },
    };
}
exports.keyCredentialAuthenticationPolicy = keyCredentialAuthenticationPolicy;
