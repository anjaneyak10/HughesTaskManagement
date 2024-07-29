import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-slide-toggle-cell-renderer',
  template: `
    <mat-slide-toggle [checked]="params.value" color="primary" (change)="onToggle($event)">
    </mat-slide-toggle>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class SlideToggleCellRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onToggle(event: any): void {
    this.params.data.completion = event.checked;
    if (this.params.onChange) {
      this.params.onChange(this.params);
    }
  }
}