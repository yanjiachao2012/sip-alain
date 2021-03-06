import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ISipContextMenu } from '../../../../base/i-sip-context-menu';
import { SipAlainConfig } from '../../../../base/sip-alain-config';
import { ISipRestSqlDefParams } from '../../../../help/sip-helper';
import { Settings } from '../../ng-data-table/base/settings';
import { CellEventArgs } from '../../ng-data-table/types/event-args';
import { Row } from '../../ng-data-table/types/interface';
import { TreeNode } from '../../ng-tree-table/base/tree-node';

export class SipTableSettings extends Settings {

    url?: string;
    connstr?: string;
    sqlId?: string;
    pageSize?: number;
    pageIndex?: number;
    sortName?: string;
    sortOrder?: '' | 'asc' | 'desc';
    searchparam?: object;
    restSrv?: (param: ISipRestSqlDefParams<any>) => Observable<any>;

    /**id字段, 默认为id */
    treeIdField?: string;
    /**name字段，默认为name */
    treeNameField?: string;
    /**叶子字段，值为false表示有子节点（不是叶子） */
    treeLeafField?: string;
    /**ParentId字段，默认为parentId */
    treeParentIdField?: string;
    /**children字段, 默认为空，如果有内容表示子节点数据 */
    treeChildrenField?: string;
    /**初始数据 */
    treeDatas?: any[];
    /**自定义节点内容 */
    treeNodes?: (node?: TreeNode) => Promise<TreeNode[]>;

    contextmenuAction?: (event: CellEventArgs, row: Row) => ISipContextMenu;

    constructor(init?: Partial<SipTableSettings>, injector?: Injector) {
        if (injector) {
            let config: SipAlainConfig = injector && injector.get(SipAlainConfig);
            if (config && config.crudtable)
                init = Object.assign({}, config.crudtable, init);
        }
        super(init);
        this.api || (this.api = this.url);
        this.contextmenuAction && (this.contextMenu = true);
    }
}
