import User from '../entity/User';
import { AppDataSource } from '../data-source';

const GetUsers = async () => {
  const responseItem = await AppDataSource.getRepository(User);
  const allUsers = await responseItem.find({
    relations: ['role'],
    where: {
      role: {
        description: 'User'
      }
    }
  });
  return allUsers;
};

export { GetUsers };
