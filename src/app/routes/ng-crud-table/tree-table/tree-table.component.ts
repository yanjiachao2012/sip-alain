import { Component, ViewContainerRef } from '@angular/core';
import { SipNgInit, SipPage, SipProvidePages, SipTableColumn, SipTableSettings, SipTableTreeManager } from 'sip-alain';

@Component({
  selector: 'sip-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less'],
  providers: [...SipProvidePages(TreeTableComponent)]
})
export class TreeTableComponent extends SipPage {

  constructor(vcf: ViewContainerRef) {
    super(vcf);

  }

  params = { id: '' };

  /**等效于ngOnInit, 但可以多次使用 */
  @SipNgInit()
  private _init() {
    this.params = this.$params(this.params);
    console.log('init', this.params);
    this.tableManager = new SipTableTreeManager(this.$injector(), this.columns, new SipTableSettings({
      /**id字段, 默认为id */
      treeIdField: 'id',
      /**name字段，默认为name */
      treeNameField: 'name',
      /**叶子字段，值为false表示有子节点（不是叶子） */
      treeLeafField: 'leaf',
      /**ParentId字段，默认为parentId */
      treeParentIdField: 'parentId',
      /**children字段, 默认为空，如果有内容表示子节点数据 */
      // treeChildrenField:'children',
      treeDatas: [
        {
          id: 'MALE',
          name: 'MALE'
        },
        {
          id: 'FEMALE',
          name: 'FEMALE'
        },
        {
          id: 'FEMALE_1',
          parentId: 'MALE',
          name: 'FEMALE_1'
        },
        {
          id: 'FEMALE_1_1',
          parentId: 'FEMALE_1',
          name: 'FEMALE_1_1'
        },
        {
          id: 'FEMALE_a',
          parentId: 'FEMALE',
          name: 'FEMALE_a'
        }]
    }));

    this.tableManagerChild = new SipTableTreeManager(this.$injector(), this.columns, new SipTableSettings({
      /**id字段, 默认为id */
      treeIdField: 'id',
      /**name字段，默认为name */
      treeNameField: 'name',
      /**children字段, 默认为空，如果有内容表示子节点数据 */
      treeChildrenField: 'children',
      // selectionMultiple: true,
      // selectionMode: 'checkbox',
      treeDatas: [
        {
          id: 'MALE',
          name: 'MALE',
          column: 'MALE',
          "gender": "gender",
          "cube_size": "1",
          "exp": 777777,
          children: [{
            id: 'FEMALE_1',
            name: 'FEMALE_1',
            children: [{
              id: 'FEMALE_1_1',
              name: 'FEMALE_1_1'
            }]
          }]
        },
        {
          id: 'FEMALE',
          name: 'FEMALE',
          children: [{
            id: 'FEMALE_a',
            name: 'FEMALE_a'
          }]
        }
      ]
    }));
    this.tableManager.events.selectionSource$.subscribe(() => {
      console.log('selecha', this.tableManager.getSelectedRows());
    });
  }
  tableManager: SipTableTreeManager;
  tableManagerChild: SipTableTreeManager;
  tableManagerHttp: SipTableTreeManager;

  public columns: SipTableColumn[] = <SipTableColumn[]>[
    {
      title: 'Node',
      name: 'node',
      sortable: false,
      filter: false,
      frozen: true,
      width: 250,
    },
    {
      title: 'Column',
      name: 'column',
      sortable: false,
      filter: false,
      frozen: false,
      resizeable: true,
      editable: true,
      width: 250,
    },
    {
      title: 'Cube_size',
      name: 'cube_size',
      sortable: false,
      filter: false,
      frozen: false,
      resizeable: true,
      editable: true,
      width: 250,
    },
    {
      title: 'Exp',
      name: 'exp',
      sortable: false,
      filter: false,
      frozen: false,
      resizeable: true,
      editable: true,
      width: 250,
    }
  ];

  onEditComplete(event) {
    console.log('onEditComplete', event);
  }
}
