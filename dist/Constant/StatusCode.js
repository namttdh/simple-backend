"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCode = exports.getReasonPhrase = exports.ReasonPhrases = exports.StatusCodes = void 0;
const http_status_codes_1 = require("http-status-codes");
exports.StatusCodes = http_status_codes_1.StatusCodes;
exports.ReasonPhrases = http_status_codes_1.ReasonPhrases;
exports.getReasonPhrase = http_status_codes_1.getReasonPhrase;
exports.getStatusCode = http_status_codes_1.getStatusCode;
