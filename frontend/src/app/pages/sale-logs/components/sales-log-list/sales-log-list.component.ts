import { Component } from '@angular/core';
import { TaskStatusTranslation } from '../../enum/sale-logs.eum';

@Component({
  selector: 'app-sales-log-list',
  standalone: false,
  templateUrl: './sales-log-list.component.html',
})
export class SalesLogListComponent {
  taskStatusTranslation = TaskStatusTranslation;
  taskTypeIcon: { [key: string]: string } = {
    Call: 'call',
    Meeting: 'groups',
    'Video Call': 'video_call',
  };

  tableColumns = [
    {
      name: 'Date',
      sort: true,
    },
    {
      name: 'Entity Name',
      sort: true,
      filter: true,
    },
    {
      name: 'Task Type',
      taskType: 0,
      sort: true,
      filter: true,
    },
    {
      name: 'Time',
      sort: true,
    },
    {
      name: 'Contact Person',
      sort: true,
      filter: true,
    },
    {
      name: 'Notes',
      sort: false,
      filter: false,
      width: 'w-1/4',
    },
    {
      name: 'Status',
      sort: true,
      filter: true,
    },
    {
      name: '',
      sort: false,
      filter: false,
    },
  ];

  data: any = [
    { status: 0, taskType: 'Meeting' },
    { status: 1, taskType: 'Call' },
  ];

  filter = true;
}
