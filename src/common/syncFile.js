import fs from 'fs';

export const readFile = path => {
  return fs.readFileSync(path, 'utf-8');
};

export const readFileSyn = path => {
  return new Promise( (resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
