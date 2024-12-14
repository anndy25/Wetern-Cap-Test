import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-sales-log-action',
  templateUrl: './sales-log-action.component.html',
  standalone: false,
})
export class SalesLogActionComponent {
  readonly dialog = inject(MatDialog);
  onClickAction() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '470px',
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe();
  }
}
