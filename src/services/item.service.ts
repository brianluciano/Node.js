import Item from '../entity/Item';
import { AppDataSource } from '../data-source';

const GetItem = async (idItem: string) => {
  const responseItem = await AppDataSource.getRepository(Item);
  const item = await responseItem.findOne({
    relations: ['category'],
    where: {
      id: idItem
    }
  });

  return item;
};

const GetItems = async () => {
  const responseItem = await AppDataSource.getRepository(Item);
  const allItems = await responseItem.find();
  return allItems;
};

const CreateItem = async (item: Item) => {
  const resItem = await AppDataSource.manager.save(Item, item);
  return resItem;
};

const UpdateItem = async (item: Item) => {
  const resItem = await AppDataSource.createQueryBuilder()
    .update(Item)
    .set(item)
    .where('id = :id', { id: item.id })
    .returning('*')
    .execute();

  return resItem.raw[0];
};

const DeleteItem = async (idItem: string) => {
  const responseItem = await AppDataSource.getRepository(Item);
  await responseItem.delete({ id: idItem });
};

export { GetItems, GetItem, CreateItem, UpdateItem, DeleteItem };
