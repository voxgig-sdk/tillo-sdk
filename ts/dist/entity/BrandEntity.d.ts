import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Brand, BrandListMatch } from '../TilloTypes';
declare class BrandEntity extends TilloEntityBase<Brand> {
    constructor(client: TilloSDK, entopts: any);
    make(this: BrandEntity): BrandEntity;
    list(this: any, reqmatch?: BrandListMatch, ctrl?: Control): Promise<BrandEntity[]>;
}
export { BrandEntity };
