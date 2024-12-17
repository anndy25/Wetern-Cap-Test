import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
  subs = new Subscription();

  taskTypes = [
    { icon: 'call', type: 'Call' },
    { icon: 'groups', type: 'Meeting' },
    { icon: 'video_call', type: 'Video Call' },
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
    if (this.taskInfo) {
      this.createTask();
    } else {
      this.updateTask();
    }
  }

  createTask() {
    this._store
      .dispatch(
        new CreateSalesTask({ ...this.taskForm.value, date: this.taskTime })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
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
          date: this.taskTime,
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this._dialog.close();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
