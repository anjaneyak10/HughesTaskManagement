import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-dropdown-renderer',
  templateUrl: './status-dropdown-render.component.html',
  styleUrls: ['./status-dropdown-render.component.css']
})
export class StatusDropdownRendererComponent implements OnInit {
  status: string = 'false';
  params!: ICellRendererParams;

  constructor() { }

  ngOnInit(): void {
    if (this.params) {
      this.status = this.params.value || 'false';
    }
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.status = params.value || 'false';
  }

  onSelectionChange(event: any): void {
    const newValue = event.value;
    if (this.params && this.params.node && this.params.column) {
      const colId = (this.params.column as any).colId;
      if (colId) {
        this.params.node.setDataValue(colId, newValue.toString());
        console.log(this.params.node.data.projecttaskid, " " , newValue);
        localStorage.setItem(this.params.node.data.projecttaskid, newValue);
      }
    }
  }
}