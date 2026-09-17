import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Promotion, PromotionLoadMatch } from '../TilloTypes';
declare class PromotionEntity extends TilloEntityBase<Promotion> {
    constructor(client: TilloSDK, entopts: any);
    make(this: PromotionEntity): PromotionEntity;
    load(this: any, reqmatch?: PromotionLoadMatch, ctrl?: Control): Promise<PromotionEntity>;
}
export { PromotionEntity };
