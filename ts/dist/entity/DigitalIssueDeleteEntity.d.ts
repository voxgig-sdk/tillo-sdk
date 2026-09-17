import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { DigitalIssueDelete, DigitalIssueDeleteCreateData, DigitalIssueDeleteRemoveMatch } from '../TilloTypes';
declare class DigitalIssueDeleteEntity extends TilloEntityBase<DigitalIssueDelete> {
    constructor(client: TilloSDK, entopts: any);
    make(this: DigitalIssueDeleteEntity): DigitalIssueDeleteEntity;
    create(this: any, reqdata?: DigitalIssueDeleteCreateData, ctrl?: Control): Promise<DigitalIssueDeleteEntity>;
    remove(this: any, reqmatch?: DigitalIssueDeleteRemoveMatch, ctrl?: Control): Promise<DigitalIssueDeleteEntity>;
}
export { DigitalIssueDeleteEntity };
