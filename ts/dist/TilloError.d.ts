import { Context } from './Context';
declare class TilloError extends Error {
    isTilloError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TilloError };
