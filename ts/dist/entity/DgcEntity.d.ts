import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Dgc, DgcCreateData } from '../TilloTypes';
declare class DgcEntity extends TilloEntityBase<Dgc> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DgcEntity): DgcEntity;
    create(this: any, reqdata?: DgcCreateData, ctrl?: Control): Promise<DgcEntity>;
}
export { DgcEntity };
