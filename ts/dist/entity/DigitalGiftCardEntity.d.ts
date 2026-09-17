import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalGiftCard, DigitalGiftCardLoadMatch, DigitalGiftCardCreateData } from '../TilloTypes';
declare class DigitalGiftCardEntity extends TilloEntityBase<DigitalGiftCard> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalGiftCardEntity): DigitalGiftCardEntity;
    load(this: any, reqmatch?: DigitalGiftCardLoadMatch, ctrl?: Control): Promise<DigitalGiftCardEntity>;
    create(this: any, reqdata?: DigitalGiftCardCreateData, ctrl?: Control): Promise<DigitalGiftCardEntity>;
}
export { DigitalGiftCardEntity };
