import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { PhysicalGiftCard, PhysicalGiftCardCreateData, PhysicalGiftCardRemoveMatch } from '../TilloTypes';
declare class PhysicalGiftCardEntity extends TilloEntityBase<PhysicalGiftCard> {
    constructor(client: TilloSDK, entopts: any);
    make(this: PhysicalGiftCardEntity): PhysicalGiftCardEntity;
    create(this: any, reqdata?: PhysicalGiftCardCreateData, ctrl?: Control): Promise<PhysicalGiftCardEntity>;
    remove(this: any, reqmatch?: PhysicalGiftCardRemoveMatch, ctrl?: Control): Promise<PhysicalGiftCardEntity>;
}
export { PhysicalGiftCardEntity };
