'use strict';

const Helpers = require('yeoman-test');
const Assert = require('yeoman-assert');

describe('paker-lerna', () => {
  it('Create a new monorepo', () => {
    const answers = {
      name: 'mono repo test',
      author: 'Mortadelo mortadelo@tia.es',
      license: 'MIT',
    };

    return Helpers
      .run(require.resolve('../generators/app/index.js'))
      .withPrompts(answers)
      .then(() => {
        Assert.file([
          '.editorconfig',
          '.eslintrc',
          '.eslintrc.json',
          'README.md',
          'lerna.json',
          'package.json',
        ]);

        Assert.jsonFileContent('package.json', { name: 'mono-repo-test', author: 'Mortadelo mortadelo@tia.es' });
      });
  });
});
