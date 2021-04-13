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
exports.keyCredentialAuthenticationPolicy = exports.keyCredentialAuthenticationPolicyName = void 0;
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
