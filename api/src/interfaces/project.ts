import { Document } from 'mongoose';
import IOrganization from './organization';
import { ITicket } from './ticket';
import IUser from './user';

export interface IColumn {
  id: string;
  title: string;
  isDoneColumn: boolean;
  taskIds: Array<ITicket['_id']>;
}

export interface IHistory {
  ticket: {
    id: ITicket['_id'];
    displayValue: string;
    type: string;
  };
  type: string;
  editor: IUser['_id'];
  field: string | null;
  before: string | null;
  after: string | null;
  date: number;
}

export interface IProject extends Document {
  key: string;
  orgId: IOrganization['_id'];
  name: string;
  members: Array<IUser['_id']>;
  columns: {
    [key: string]: IColumn;
  };
  columnOrder: Array<string>;
  projectIconUrl: string;
  description: string;
  history: Array<IHistory>;
  seq: number;
}
