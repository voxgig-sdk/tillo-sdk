import { BrandEntity } from './entity/BrandEntity';
import { DgcEntity } from './entity/DgcEntity';
import { FloatEntity } from './entity/FloatEntity';
export type * from './TilloTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TilloEntityBase } from './TilloEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TilloSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Brand(entopts?: Record<string, any>): BrandEntity;
    Dgc(entopts?: Record<string, any>): DgcEntity;
    Float(entopts?: Record<string, any>): FloatEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TilloSDK;
    tester(testopts?: any, sdkopts?: any): TilloSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TilloSDK;
export { stdutil, config, BaseFeature, TilloEntityBase, TilloSDK, SDK, };
