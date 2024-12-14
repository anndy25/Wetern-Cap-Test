import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

@Component({
  selector: 'app-sale-logs',
  standalone: false,
  templateUrl: './sale-logs.component.html',
  styleUrls: ['./sale-logs.component.scss'],
})
export class SaleLogsComponent {
  readonly dialog = inject(MatDialog);

  constructor() {
    // const dialogRef = this.dialog.open(TaskModalComponent, {
    //   width: '470px',
    //   disableClose: true, // Prevent closing when clicking outside or pressing ESC
    //   autoFocus: false, // Prevent default on-focus behavior
    //   data: {},
    // });
    // dialogRef.afterClosed().subscribe((result) => {});
  }
}
