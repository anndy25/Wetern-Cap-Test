export interface ContactPersonInfo {
  _id: string;
  name: string;
}

export interface TaskModel {
  entityName: string;
  date: string;
  taskType: string;
  phoneNumber: number;
  contactPerson: ContactPersonInfo;
  note?: string;
  status: number;
}
