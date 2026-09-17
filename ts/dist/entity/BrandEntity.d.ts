import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Brand, BrandLoadMatch } from '../TilloTypes';
declare class BrandEntity extends TilloEntityBase<Brand> {
    constructor(client: TilloSDK, entopts: any);
    make(this: BrandEntity): BrandEntity;
    load(this: any, reqmatch?: BrandLoadMatch, ctrl?: Control): Promise<BrandEntity>;
}
export { BrandEntity };
