import fs from 'fs'
import path from 'path'
const directoryPath = 'C:/';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
  } else {
    console.log('Files in directory:', files);
  }
});
