import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalOrderCard, DigitalOrderCardCreateData } from '../TilloTypes';
declare class DigitalOrderCardEntity extends TilloEntityBase<DigitalOrderCard> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalOrderCardEntity): DigitalOrderCardEntity;
    create(this: any, reqdata?: DigitalOrderCardCreateData, ctrl?: Control): Promise<DigitalOrderCardEntity>;
}
export { DigitalOrderCardEntity };
