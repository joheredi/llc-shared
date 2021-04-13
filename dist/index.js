"use strict";
/**
 * Azure Rest Core Client library for JavaScript
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultPipeline = void 0;
var clientHelpers_1 = require("./clientHelpers");
Object.defineProperty(exports, "createDefaultPipeline", { enumerable: true, get: function () { return clientHelpers_1.createDefaultPipeline; } });
__exportStar(require("./common"), exports);
__exportStar(require("./getClient"), exports);
__exportStar(require("./pathClientTypes"), exports);
