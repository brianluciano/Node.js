# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
4. Migrations :

npm run typeorm migration:generate ./src/migration/migration_name
npm run migration:create:win --name=initialDataSeed
npm run typeorm migration:run
npm run typeorm migration:revert

Eslint
npx eslint .

Prettier
npx prettier . --write
