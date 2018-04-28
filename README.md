# generator-paker-lerna
This is my small scaffolding to a start a monorepo in JavaScript with [Lerna](https://lernajs.io/).

The aim of this module is to add more functionality in the future while I learn or need more functionality, I don't entend to solve all cases or have all the tools you need but feel free to upgrade it with any tool or feature you think can be good.

# Install
> $ npm install -g generator-paker-lerna

# Usage
> yo paker-lerna

This scaffolding generates all the files at the current directory, so be sure to change to a new directory before execute it.

generator-paker-lerna creates all the files and folders to start a monorepo, because Lerna works with [Git](https://git-scm.com/), it's a good practice to start the repo in a git directory (Lerna relay on Git to create tags and versions).
Those are the files and folders you'll find after execute the scaffolding:

* .editorconfig
* .eslintrc
* .eslintrc.json
* README.md
* lerna.json
* package-lock.json
* package.json
* packages/

All the modules of the monorepo must be inside packages, read more about Lerna and monorepos at: https://lernajs.io/

## Features
Those are the defaults scripts:
* `bootstrap`: lerna bootstrap command
* `cm`: option to commit. It follows the conventional commit type
* `clean`: lerna clean command
* `commitmsg`: it is a command uses by husky to ensure all the commits are under the conventional commit type (You don't need to run it)
* `publish`: lerna publish command. It adds a default text so you can find out when a publish was done

## Notes
At this momment, the scaffolding uses the Airbnb eslint plugin, in the future it would offer different eslint options.

## Contributions
Any new feature, improvement or fix would be apprecaite, please fell free to upgrade and update the tool.
