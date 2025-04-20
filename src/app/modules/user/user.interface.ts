/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: keyof typeof USER_ROLE;
  isRequestPending: boolean;
  details?: Partial<TUserDetails> | object;
  isDeleted?: boolean;
};

// export type TUserDetails = {
//   name: string;
//   position: string;
//   education: string;
//   photoURL: string;
//   yearsOfExperience: string;
// };
export type TUserDetails = {
  name: string;
  position: string;
  yearsOfExperience: string;
  education: string;
  photoURL: string;
  whatsAppNumber: string;
  profession: string;
  gender: string;
  // dateOfBirth: string;
  address: string;
};

// creating custom statics method
export interface UserStaticModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmailOrNumber(id: string): Promise<TUser | null>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
