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
            name: kebabCase(answers.name),
            license: answers.license,
          },
        },
        { origin: 'README.md', destination: 'README.md', variables: { name: answers.name } },
        { origin: '.gitignore', destination: '.gitignore', variables: {} },
        { origin: 'lerna.json', destination: 'lerna.json', variables: { packages: answers.packages }},
        { origin: '.editorconfig', destination: '.editorconfig', variables: {} },
        { origin: '.eslintrc', destination: '.eslintrc', variables: {} },
        { origin: 'commitlint.config.js', destination: 'commitlint.config.js', variables: {} },
      ];

      return LernaFileTree;
    };
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'The name of your monorepo',
      default: this.appname, // Default to current folder name
    },
    {
      type: 'input',
      name: 'packages',
      message: 'Name of the package folder',
      default: 'packages',
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
    this.installDependencies({ npm: true, bower: false, yarn: false });
    shell.exec('npx lerna init');
  }
};
