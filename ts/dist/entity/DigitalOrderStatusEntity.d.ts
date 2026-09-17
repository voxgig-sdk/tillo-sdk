import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalOrderStatus, DigitalOrderStatusLoadMatch } from '../TilloTypes';
declare class DigitalOrderStatusEntity extends TilloEntityBase<DigitalOrderStatus> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalOrderStatusEntity): DigitalOrderStatusEntity;
    load(this: any, reqmatch?: DigitalOrderStatusLoadMatch, ctrl?: Control): Promise<DigitalOrderStatusEntity>;
}
export { DigitalOrderStatusEntity };
