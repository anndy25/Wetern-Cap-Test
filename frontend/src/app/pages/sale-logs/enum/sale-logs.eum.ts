export enum TaskStatus {
  CLOSED,
  OPEN,
}

export const TaskStatusTranslation: { [key: number]: string } = {
  [TaskStatus.OPEN]: 'Open',
  [TaskStatus.CLOSED]: 'Closed',
};
