## tsconfig.base.json Documentation

This file tells the Typescript compiler how to compile the typescript code into javascript

`"compilerOptions": {`
- contains settings that control how TypeScript compilees your code

`"target": "es2022",`
- tells TypeScript to compile the output Javascript to be compatible with ES2022
- affects which javascript features are allowed and whether newer syntax gets converted

`"module": "ESNext",`
- controls how modules are generated in the outpu
- ESNext means to use modern `import`/`export` syntax in the output

`"moduleResolution": "bundler",`
- tells TypeScript how to resolve imports
- "Bundler" means to resolve the modules the same way as modern bundlers

`"strict": true,`
- enables all strict type-checking options
- makes TypeScript stricter and better at catching bugs

`"skipLibCheck": true,`
- Doesn't type-check declaration files inside node_modules
- avoids errors caused by third-party libraries

`"forceConsistentCasingInFileNames": true`
- File imports must match the exact casing of the file name
- prevents cross-platform bugs