import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'sip-modal-body',
  template: `<ng-template #content>
  <nz-spin nzTip="" [nzSpinning]="loading">
  <div style="overflow-x: hidden;" [style.height]="height">
      <ng-content *ngIf="showed"></ng-content>
  </div>
  </nz-spin>
  </ng-template>`,
  styles: []
})
export class SipModalBodyComponent {

  @ViewChild('content') content: TemplateRef<any>;
  height = 'auot';

  showed = true;
  loading = false;

}
