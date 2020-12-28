import { Document } from 'mongoose';

export default interface IOrganization extends Document {
  name: string;
}
