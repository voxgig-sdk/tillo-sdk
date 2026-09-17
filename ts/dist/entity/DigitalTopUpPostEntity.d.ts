import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalTopUpPost, DigitalTopUpPostCreateData } from '../TilloTypes';
declare class DigitalTopUpPostEntity extends TilloEntityBase<DigitalTopUpPost> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalTopUpPostEntity): DigitalTopUpPostEntity;
    create(this: any, reqdata?: DigitalTopUpPostCreateData, ctrl?: Control): Promise<DigitalTopUpPostEntity>;
}
export { DigitalTopUpPostEntity };
