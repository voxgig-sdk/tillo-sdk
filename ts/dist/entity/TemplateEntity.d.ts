import { TilloEntityBase } from '../TilloEntityBase';
import type { TilloSDK } from '../TilloSDK';
import type { Control } from '../types';
import type { Template, TemplateLoadMatch } from '../TilloTypes';
declare class TemplateEntity extends TilloEntityBase<Template> {
    constructor(client: TilloSDK, entopts: any);
    make(this: TemplateEntity): TemplateEntity;
    load(this: any, reqmatch?: TemplateLoadMatch, ctrl?: Control): Promise<TemplateEntity>;
}
export { TemplateEntity };
