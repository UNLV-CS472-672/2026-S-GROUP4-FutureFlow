## Package.json Documentation

This file defines the repo as a pnpm monorepo, links all the sub-packages together, lets us run global scripts across all apps, and centralized dependency management

`"name": "futureflow",` 
- Name of the workplace for our monorepo

`"private": true,`
- Sets our privacy to private, so our package won't be published to npm

`"projectManager": "pnpm",`
- Indicates that our project uses pnpm

```
"workspaces": [
        "apps/*",
        "packages/*"
    ],
```
- Tells pnpm to treat every folder inside `apps/` and `packages/` as a package
- pnpm links each folder to have its own package.json automatically, so we can share dependencies, internal package imports, and centralized installs

`"dev": "pnpm -r dev",`
- -r means recursive
- runs pnpm dev inside every workspace package
- if the package/folder has a `dev` script, then running `pnpm dev` will start all of them

`"build": "pnpm -r build",`
- runs `build` in every workspace all at once; i.e builds frontend, builds backend

`"lint": "pnpm -r lint",`
- runs linting across all apps and packages

`"test": "pnpm -r test"`
- runs test scripts in every workspace package