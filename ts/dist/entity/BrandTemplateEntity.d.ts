import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { BrandTemplate, BrandTemplateLoadMatch } from '../TilloTypes';
declare class BrandTemplateEntity extends TilloEntityBase<BrandTemplate> {
    constructor(client: TilloSDK, entopts: any);
    make(this: BrandTemplateEntity): BrandTemplateEntity;
    load(this: any, reqmatch?: BrandTemplateLoadMatch, ctrl?: Control): Promise<BrandTemplateEntity>;
}
export { BrandTemplateEntity };
