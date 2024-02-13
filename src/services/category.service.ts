import { AppDataSource } from '../data-source';
import Category from '../entity/Category';

const GetCategory = async (idCategory: string) => {
  const responseItem = await AppDataSource.getRepository(Category);
  const category = await responseItem.findOneBy({ id: idCategory });
  return category;
};

const GetCategories = async () => {
  const responseCategory = await AppDataSource.getRepository(Category);
  const allCategories = await responseCategory.find();
  return allCategories;
};

const CreateCategory = async (category: Category) => {
  const resCategory = await AppDataSource.manager.save(Category, category);
  return resCategory;
};

const UpdateCategory = async (idCategory: string, catego: Category) => {
  const resCategory = await AppDataSource.createQueryBuilder()
    .update(Category)
    .set(catego)
    .where('id = :id', { id: idCategory })
    .returning('*')
    .execute();

  return resCategory.raw[0];
};

const DeleteCategory = async (idCategory: string) => {
  const responseItem = await AppDataSource.getRepository(Category);
  const categroy = await responseItem.delete({ id: idCategory });
  return categroy;
};

export {
  GetCategories,
  GetCategory,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
};
