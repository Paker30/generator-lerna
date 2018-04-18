const Generator = require('yeoman-generator');
const { kebabCase } = require('lodash');
const whoami = require('whoami');
const shell = require('shelljs');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.Licenses = ['MIT', 'ISC', 'Apache-2.0'];
    this.writingMonoRepo = (answers) => {
      const LernaFileTree = [
        {
          origin: 'package.json',
          destination: 'package.json',
          variables: {
            author: answers.author,
            name: answers.name,
            license: answers.license,
            repo: answers.repo,
            bugs: answers.repo.replace(/.git$/, ''),
            homepage: answers.repo.replace(/.git$/, ''),
          },
        },
        { origin: 'README.md', destination: 'README.md', variables: { name: answers.name } },
        { origin: '.gitignore', destination: '.gitignore', variables: {} },
        { origin: 'lerna.json', destination: 'lerna.json', variables: {} },
        { origin: '.editorconfig', destination: '.editorconfig', variables: {} },
        { origin: '.eslintrc', destination: '.eslintrc', variables: {} },
        { origin: '.eslintrc.json', destination: '.eslintrc.json', variables: {} },
      ];

      return LernaFileTree;
    };
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'The name of your new bot',
      default: kebabCase(this.appname), // Default to current folder name
    },
    {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this awesome bot?',
      default: whoami,
    },
    {
      type: 'list',
      name: 'license',
      message: 'Which license do you want to use?',
      choices: this.Licenses,
    },
    {
      type: 'input',
      name: 'repo',
      message: 'Which is the git repo you want to use?',
    },
    ])
      .then((answers) => { this.answers = answers; });
  }

  writing() {
    return this.writingMonoRepo(this.answers).map((file) => {
      return this.fs.copyTpl(
        this.templatePath(file.origin),
        this.destinationPath(file.destination),
        file.variables,
      );
    });
  }

  install() {
    this.installDependencies({ npm: true, bower: false, yarn: false })
      .then(() => shell.exec('npx lerna init'));
  }
};
