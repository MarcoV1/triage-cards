export interface ICards {
  arrhythmias: Array<string>;
  created_date: string;
  id: number;
  patient_name: string;
  status: CARD_STATUS;
}

export enum CARD_STATUS {
  PENDING= 'PENDING',
  REJECTED = 'REJECTED',
  DONE = 'DONE'
}
