import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.css'
})
export class AppTable {
  @Input() tableData: any;
  headers:any = null;

  constructor() {
  }

  ngOnInit(): void {
    this.headers = this.tableData.reduce((acc: any, record: any) => {
      let columnNames:any = [];
      record.forEach((field: any) => {
        const { columnName } = field;
        if (!acc.includes(columnName)) {
          columnNames.push(columnName);
        }
      });
  
      return [
        ...acc,
        ...columnNames,
      ]
    }, []);
  }
}