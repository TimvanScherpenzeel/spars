"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("./EventEmitter");
exports.eventEmitter = EventEmitter_1.eventEmitter;
exports.EventEmitter = EventEmitter_1.EventEmitter;
var onConnectionChange_1 = require("./onConnectionChange");
exports.listenToConnectionChange = onConnectionChange_1.listenToConnectionChange;
exports.stopListeningToConnectionChange = onConnectionChange_1.stopListeningToConnectionChange;
var onOrientationChange_1 = require("./onOrientationChange");
exports.listenToOrientationChange = onOrientationChange_1.listenToOrientationChange;
exports.stopListeningToOrientationChange = onOrientationChange_1.stopListeningToOrientationChange;
var onVisibilityChange_1 = require("./onVisibilityChange");
exports.listenToVisibilityChange = onVisibilityChange_1.listenToVisibilityChange;
exports.stopListeningToVisibilityChange = onVisibilityChange_1.stopListeningToVisibilityChange;
var onWindowSizeChange_1 = require("./onWindowSizeChange");
exports.listenToWindowSizeChange = onWindowSizeChange_1.listenToWindowSizeChange;
exports.stopListeningToWindowSizeChange = onWindowSizeChange_1.stopListeningToWindowSizeChange;
//# sourceMappingURL=index.js.map