import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

// post
const createUserInfoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// get
const getUsersFromDb = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(
    UserModel.find().select('-password'),
    query,
  )
    .search(userSearchableFields)
    .filter();
  // .pagination();

  const data = await userQuery.modelQuery.sort({ createdAt: -1 });

  // for count document except pagination.
  const userQueryWithoutPagination = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableFields)
    .filter();

  const document = await userQueryWithoutPagination.modelQuery;
  const totalCount = document?.length;
  return { data, totalCount };
};

// get
const getCurrentUserByEmailFromDb = async (email: string) => {
  const result = await UserModel.findOne({ email }).select('-password');
  return result;
};

// update
const updateUserIntoDb = async (userId: string, body: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ _id: userId }, body, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserInfoDb,
  getUsersFromDb,
  getCurrentUserByEmailFromDb,
  updateUserIntoDb,
};
