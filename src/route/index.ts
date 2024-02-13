import { readdirSync } from 'fs';
import express from 'express';

const PATH_ROUTER = `${__dirname}`;

const router = express.Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split('.').shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter) => {
      //console.log("ruta "+ `${cleanName}`);
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
