export enum TaskStatus {
  CLOSED,
  OPEN,
}

export enum GroupBy {
  ENTITY_NAME = 'entityName',
  DATE = 'date',
  TASK_TYPE = 'taskType',
  CONTACT_PERSON = 'contactPerson',
  STATUS = 'status',
}

export const TaskStatusTranslation: { [key: number]: string } = {
  [TaskStatus.OPEN]: 'Open',
  [TaskStatus.CLOSED]: 'Closed',
};
