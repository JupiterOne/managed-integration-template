import fs from 'fs';

const packageContent = require('../package.json');
fs.writeFileSync('dist/package.json', JSON.stringify(
  {
    ...packageContent,
    scripts: {},
    devDependencies: {}
  }, null, 2
));

fs.copyFileSync('LICENSE', 'dist/LICENSE');
fs.copyFileSync('README.md', 'dist/README.md');
