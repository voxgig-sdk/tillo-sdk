import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { PhysicalOrderCard, PhysicalOrderCardCreateData } from '../TilloTypes';
declare class PhysicalOrderCardEntity extends TilloEntityBase<PhysicalOrderCard> {
    constructor(client: TilloSDK, entopts: any);
    make(this: PhysicalOrderCardEntity): PhysicalOrderCardEntity;
    create(this: any, reqdata?: PhysicalOrderCardCreateData, ctrl?: Control): Promise<PhysicalOrderCardEntity>;
}
export { PhysicalOrderCardEntity };
