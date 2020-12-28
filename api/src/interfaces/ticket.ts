import { Document } from 'mongoose';
import { IProject } from './project';
import IUser from './user';

export interface IComment {
  id?: string;
  user: IUser['_id'];
  text: string;
  date?: number;
}

export interface ITicket extends Document {
  projectId: IProject['_id'];
  key: number;
  issueType: string;
  issuePriority: string;
  summary: string;
  description?: string;
  assigneeId?: IUser['_id'];
  reporterId: IUser['_id'];
  comments: Array<IComment>;
  linkedEpic?: ITicket['_id'];
  issueColor?: string;
  dateRange?: object;
  dueDate?: Date;
  columnId?: string;
  completedAt?: Date;
}
