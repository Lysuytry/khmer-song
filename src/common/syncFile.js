import fs from 'fs';

export const readFile = path => {
  return fs.readFileSync(path, 'utf-8');
};
