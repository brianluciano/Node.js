import { AppDataSource } from '../data-source';

async function checkIdExists(entity: string, id: string): Promise<boolean> {
  try {
    const entityRepository = await AppDataSource.getRepository(entity);
    const entitySeach = await entityRepository.findOneBy({ id });
    if (entitySeach) return true;
    else return false;
  } catch (error) {
    return false;
  }
}

export default checkIdExists;
