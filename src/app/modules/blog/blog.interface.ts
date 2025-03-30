import { ObjectId } from 'mongoose';

export type TBlog = {
  blogTitle: string;
  blogImage: string;
  blogDescription: string;
  blogTags: string[];
  authorDetails?: ObjectId;
};
