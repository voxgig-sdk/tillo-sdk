import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { PhysicalOrderStatus, PhysicalOrderStatusCreateData } from '../TilloTypes';
declare class PhysicalOrderStatusEntity extends TilloEntityBase<PhysicalOrderStatus> {
    constructor(client: TilloSDK, entopts: any);
    make(this: PhysicalOrderStatusEntity): PhysicalOrderStatusEntity;
    create(this: any, reqdata?: PhysicalOrderStatusCreateData, ctrl?: Control): Promise<PhysicalOrderStatusEntity>;
}
export { PhysicalOrderStatusEntity };
