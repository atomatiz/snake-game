"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (message, error) => {
    return error
        ? `${message}: ${error instanceof Error ? error.stack : JSON.stringify(error)}`
        : message;
};
exports.errorMessage = errorMessage;
//# sourceMappingURL=error-message.util.js.map