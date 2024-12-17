import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '../../interface/sales-log.interface';
import { TaskStatus, TaskStatusTranslation } from '../../enum/sales-log.eum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateSalesTask, UpdateSalesTask } from '../../state/sales-log.action';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-modal',
  standalone: false,
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent implements OnInit, OnDestroy {
  taskStatus = TaskStatus;
  taskStatusTranslations = TaskStatusTranslation;
  taskForm!: FormGroup;
  taskTime = '';
  isLoading = false;
  titleCasePipe = new TitleCasePipe();
  subs = new Subscription();
  private _snackBar = inject(MatSnackBar);

  taskTypes = [
    { icon: 'call', type: 'Call' },
    { icon: 'groups', type: 'Meeting' },
    { icon: 'video_call', type: 'Video Call' },
    { icon: 'email', type: 'Email' },
  ];

  statusOptions = [
    {
      label: TaskStatusTranslation[TaskStatus.OPEN],
      value: TaskStatus.OPEN,
    },
    {
      label: TaskStatusTranslation[TaskStatus.CLOSED],
      value: TaskStatus.CLOSED,
    },
  ];

  constructor(
    public _dialog: MatDialogRef<TaskModalComponent>,
    private fb: FormBuilder,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public taskInfo: TaskModel
  ) {}

  ngOnInit(): void {
    this.setFormControl();
  }
  setFormControl() {
    this.taskForm = this.fb.group({
      status: new FormControl(this.taskInfo?.status ?? 1),
      entityName: new FormControl(this.taskInfo?.entityName ?? '', [
        Validators.required,
      ]),
      date: new FormControl(this.taskInfo?.date ?? '', [Validators.required]),
      taskType: new FormControl(this.taskInfo?.taskType ?? '', [
        Validators.required,
      ]),
      contactPerson: new FormControl(this.taskInfo?.contactPerson ?? '', [
        Validators.required,
      ]),
      phoneNumber: new FormControl(this.taskInfo?.phoneNumber ?? '', [
        Validators.required,
        Validators.pattern(/^[0-9]{10,15}$/),
      ]),
      notes: new FormControl(this.taskInfo?.notes ?? ''),
    });
    this.taskTime = this.taskInfo?.date ?? '';
  }

  onSubmit() {
    this.isLoading = true;
    if (this.taskInfo?.id) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask() {
    this._store
      .dispatch(
        new CreateSalesTask({
          ...this.taskForm.value,
          entityName: this.titleCasePipe
            .transform(this.taskForm.value.entityName)
            .trim(),
          contactPerson: this.titleCasePipe
            .transform(this.taskForm.value.contactPerson)
            .trim(),
          date: moment(this.taskTime).local().format(),
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.openSnackBar('Successfully created task!');
          this._dialog.close();
        },
        error: () => (this.isLoading = false),
      });
  }

  updateTask() {
    this._store
      .dispatch(
        new UpdateSalesTask(this.taskInfo.id, {
          ...this.taskForm.value,
          entityName: this.titleCasePipe
            .transform(this.taskForm.value.entityName)
            .trim(),
          contactPerson: this.titleCasePipe
            .transform(this.taskForm.value.contactPerson)
            .trim(),
          date: moment(this.taskTime).local().format(),
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.openSnackBar('Successfully updated task!');
          this._dialog.close();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: 'text-green-300',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
