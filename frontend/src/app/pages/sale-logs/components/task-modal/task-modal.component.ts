import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskModel } from '../../interface/sale-logs.interface';
import { TaskStatus, TaskStatusTranslation } from '../../enum/sale-logs.eum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: false,
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent implements OnInit {
  taskStatus = TaskStatus;
  taskStatusTranslations = TaskStatusTranslation;
  public taskForm!: FormGroup;
  taskTime = '';

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
    public _dialog: MatDialog,
    private fb: FormBuilder,
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
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      note: new FormControl(this.taskInfo?.note ?? ''),
    });
  }

  onSubmit() {
    console.log(this.taskForm);
  }
}
