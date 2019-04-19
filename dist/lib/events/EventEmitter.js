"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Vendor
var mitt_1 = __importDefault(require("mitt"));
exports.EventEmitter = mitt_1.default;
/**
 * Inspired by https://github.com/developit/mitt
 */
var eventEmitter = new mitt_1.default();
exports.eventEmitter = eventEmitter;
//# sourceMappingURL=EventEmitter.js.map