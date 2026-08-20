import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Float, FloatListMatch } from '../TilloTypes';
declare class FloatEntity extends TilloEntityBase<Float> {
    constructor(client: TilloSDK, entopts: any);
    make(this: FloatEntity): FloatEntity;
    list(this: any, reqmatch?: FloatListMatch, ctrl?: Control): Promise<FloatEntity[]>;
}
export { FloatEntity };
