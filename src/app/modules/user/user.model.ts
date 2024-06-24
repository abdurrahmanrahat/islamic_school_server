import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserStaticModel } from './user.interface';

const userSchema = new Schema<TUser, UserStaticModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// check user exists or not
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  const existingUser = await UserModel.findOne({ email });
  return existingUser;
};

// check for password matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  const isPasswordValid = await bcrypt.compare(
    plainTextPassword,
    hashedPassword,
  );

  return isPasswordValid;
};

// pre save middleware
userSchema.pre('save', async function (next) {
  // hashing password and saved into db
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// model
export const UserModel = model<TUser, UserStaticModel>('User', userSchema);
