export enum TaskStatus {
  CLOSED,
  OPEN,
}

export enum RowActionsSet {
  EDIT,
  DELETE,
  UPDATE_STATUS,
}

export enum ColumnIds {
  ENTITY_NAME = 'entityName',
  DATE = 'date',
  TASK_TYPE = 'taskType',
  CONTACT_PERSON = 'contactPerson',
  STATUS = 'status',
  TIME = 'time',
  NOTES = 'notices',
  EMTY = 'emty',
}

export const ColumnNames: { [key: string]: string } = {
  [ColumnIds.ENTITY_NAME]: 'Entity Name',
  [ColumnIds.DATE]: 'Date',
  [ColumnIds.TASK_TYPE]: 'Task Type',
  [ColumnIds.CONTACT_PERSON]: 'Contact Person',
  [ColumnIds.STATUS]: 'Status',
};

export const TaskStatusTranslation: { [key: number]: string } = {
  [TaskStatus.OPEN]: 'Open',
  [TaskStatus.CLOSED]: 'Closed',
};

export const TaskTypeIcon: { [key: string]: string } = {
  Call: 'call',
  Meeting: 'groups',
  'Video Call': 'video_call',
};
