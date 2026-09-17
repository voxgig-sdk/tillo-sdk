import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalIssuePost, DigitalIssuePostCreateData } from '../TilloTypes';
declare class DigitalIssuePostEntity extends TilloEntityBase<DigitalIssuePost> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalIssuePostEntity): DigitalIssuePostEntity;
    create(this: any, reqdata?: DigitalIssuePostCreateData, ctrl?: Control): Promise<DigitalIssuePostEntity>;
}
export { DigitalIssuePostEntity };
