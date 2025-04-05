import { TUser } from './user.interface';
import { UserModel } from './user.model';

// post
const createUserInfoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// get
const getCurrentUserByEmailFromDb = async (email: string) => {
  const result = await UserModel.findOne({ email });
  return result;
};

const updateUserIntoDb = async (userId: string, body: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ _id: userId }, body, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserInfoDb,
  getCurrentUserByEmailFromDb,
  updateUserIntoDb,
};
