import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Float, FloatLoadMatch, FloatListMatch, FloatCreateData } from '../TilloTypes';
declare class FloatEntity extends TilloEntityBase<Float> {
    constructor(client: TilloSDK, entopts: any);
    make(this: FloatEntity): FloatEntity;
    load(this: any, reqmatch?: FloatLoadMatch, ctrl?: Control): Promise<FloatEntity>;
    list(this: any, reqmatch?: FloatListMatch, ctrl?: Control): Promise<FloatEntity[]>;
    create(this: any, reqdata?: FloatCreateData, ctrl?: Control): Promise<FloatEntity>;
}
export { FloatEntity };
