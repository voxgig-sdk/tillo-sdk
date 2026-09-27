"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilloError = void 0;
class TilloError extends Error {
    isTilloError = true;
    sdk = 'Tillo';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TilloError = TilloError;
//# sourceMappingURL=TilloError.js.map