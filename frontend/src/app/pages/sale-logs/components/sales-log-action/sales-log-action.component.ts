import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Store } from '@ngxs/store';
import { UpdateSalesLogParameter } from '../../state/sales-log.action';

@Component({
  selector: 'app-sales-log-action',
  templateUrl: './sales-log-action.component.html',
  standalone: false,
})
export class SalesLogActionComponent {
  constructor(private _dialog: MatDialog, private _store: Store) {}
  onClickAction() {
    const dialogRef = this._dialog.open(TaskModalComponent, {
      width: '470px',
      disableClose: true,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe();
  }

  onSearchChange(search: string) {
    this._store.dispatch(new UpdateSalesLogParameter({ search }));
  }
}
