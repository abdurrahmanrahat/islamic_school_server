import { Types } from 'mongoose';

export type TBlog = {
  blogTitle: string;
  blogImage: string;
  blogDescription: string;
  blogTags: string[];
  authorDetails: Types.ObjectId;
  isDeleted?: boolean;
};
