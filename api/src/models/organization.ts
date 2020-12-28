import mongoose, { Schema } from 'mongoose';
import IOrganization from '../interfaces/organization';

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrganization>(
  'Organization',
  organizationSchema
);
