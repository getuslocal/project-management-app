import { Document } from 'mongoose';
import IOrganization from './organization';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  pictureUrl: string;
  role?: string;
  position?: string;
  orgId?: IOrganization['_id'];
}
