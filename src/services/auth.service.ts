import User from '../entity/User';
import Role from '../entity/Role';
import { AppDataSource } from '../data-source';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

const registerNewUser = async (userReq: User) => {
  const responseItem = await AppDataSource.getRepository(User);
  const responseRole = await AppDataSource.getRepository(Role);
  const checkId = await responseItem.findOneBy({ email: userReq.email });
  if (checkId) return 'The user already exists in the database';

  const roleUserId = await responseRole.findOne({
    where: {
      description: 'User'
    }
  });
  const passHash = await encrypt(userReq.password);
  userReq.password = passHash;
  if (roleUserId) {
    userReq.role = roleUserId;
  } else {
    return 'Role User has not found';
  }
  return await AppDataSource.manager.save(User, userReq);
};

const loginUser = async (email: string, password: string) => {
  const responseItem = await AppDataSource.getRepository(User);
  const checkId = await responseItem.findOneBy({ email });
  if (!checkId) return 'User was not found';
  const passwordHash = checkId.password;
  const isCorrect = await verified(password, passwordHash);
  if (!isCorrect) return 'Incorrect password';
  const token = await generateToken(checkId.id);
  const data = {
    token,
    user: checkId
  };
  return data;
};

export { registerNewUser, loginUser };
