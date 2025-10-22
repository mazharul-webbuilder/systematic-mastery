# Node Package Manager (NPM)

A comprehensive guide to working with NPM, the default package manager for Node.js.

## Table of Contents

- [Version Check](#version-check)
- [Updating NPM](#updating-npm)
- [Initializing a Project](#initializing-a-project)
- [Installing Packages](#installing-packages)
- [Semantic Versioning](#semantic-versioning)
- [Version Specifiers](#version-specifiers)
- [Managing Dependencies](#managing-dependencies)
- [Installing Specific Versions](#installing-specific-versions)
- [Updating Packages](#updating-packages)
- [Development Dependencies](#development-dependencies)
- [Uninstalling Packages](#uninstalling-packages)
- [Global Packages](#global-packages)
- [NPM Scripts](#npm-scripts)
- [Package Lock](#package-lock)
- [Publishing a Package](#publishing-a-package)
- [NPX](#npx)
- [Workspaces](#workspaces)

## Version Check

Check your current NPM version:

```bash
  npm -v
```

## Updating NPM

Update NPM to the latest version globally:

```bash
  npm install -g npm@latest
```

## Initializing a Project

Create a `package.json` file to store project metadata and dependencies:

```bash
  npm init
```

Or skip the interactive setup:

```bash
  npm init -y
```

The `package.json` file contains:

- Project name, version, description
- Dependencies and devDependencies
- Scripts
- Author, license, and other metadata

## Installing Packages

Install a third-party package:

```bash
  npm install underscore
```

Short form:

```bash
  npm i underscore
```

When you install a package, NPM automatically:

- Downloads the package and its dependencies
- Updates `package.json`
- Creates/updates `package-lock.json`
- Stores packages in `node_modules` folder

If multiple packages depend on different versions of the same package, NPM handles this by creating nested dependencies
when necessary.

## Semantic Versioning

NPM uses Semantic Versioning (SemVer) format:

```
Major.Minor.Patch
Example: 4.13.6
```

- **Major**: Breaking changes (incompatible API changes)
- **Minor**: New features (backward-compatible)
- **Patch**: Bug fixes (backward-compatible)

## Version Specifiers

### Caret (^) - Default

Allows updates that don't change the leftmost non-zero digit:

```json
"^4.13.6"
```

- Matches: 4.13.7, 4.14.0, 4.20.1
- Doesn't match: 5.0.0

Equivalent to:

```json
"4.x"
```

### Tilde (~)

Allows patch-level changes only:

```json
"~4.13.6"
```

- Matches: 4.13.7, 4.13.9
- Doesn't match: 4.14.0

Equivalent to:

```json
"4.13.x"
```

### Exact Version

Lock to a specific version:

```json
"4.13.6"
```

### Other Specifiers

- `*` or `x`: Any version
- `>=4.13.6`: Greater than or equal to
- `<5.0.0`: Less than
- `4.13.6 - 4.15.0`: Range

## Managing Dependencies

List all installed dependencies in a tree structure:

```bash
  npm list
```

List only top-level dependencies:

```bash
  npm list --depth=0
```

List globally installed packages:

```bash
  npm list -g --depth=0
```

View package information:

```bash
  npm view <package-name>
  npm info <package-name>
```

## Installing Specific Versions

Install a specific version:

```bash
  npm install mongoose@2.4
```

Install the latest version:

```bash
  npm install mongoose@latest
```

## Updating Packages

Check for outdated packages:

```bash
  npm outdated
```

Update all packages (respects version specifiers):

```bash
  npm update
```

Note: `npm update` only updates minor and patch versions by default. It won't update major versions to prevent breaking
changes.

Update a specific package:

```bash
  npm update <package-name>
```

Update to latest major version (ignoring semver):

```bash
  npm install <package-name>@latest
```

## Development Dependencies

Install packages needed only for development (testing, building, linting):

```bash
  npm install jshint --save-dev
```

Short form:

```bash
  npm i jshint -D
```

These packages are listed under `devDependencies` in `package.json` and won't be installed in production when using:

```bash
  npm install --production
```

## Uninstalling Packages

Remove a package:

```bash
  npm uninstall <package-name>
```

Short form:

```bash
  npm un <package-name>
```

Remove a dev dependency:

```bash
  npm uninstall <package-name> --save-dev
```

## Global Packages

Global packages are installed system-wide and accessible from anywhere, not just in a specific project.

Install a package globally:

```bash
  npm install -g <package-name>
```

Common global packages:

- `npm` (NPM itself)
- `typescript`
- `nodemon`
- `pm2`
- `create-react-app`
- `@nestjs/cli`
- `@angular/cli`

List global packages:

```bash
  npm list -g --depth=0
```

Uninstall a global package:

```bash
  npm uninstall -g <package-name>
```

Find global installation directory:

```bash
  npm root -g
```

## NPM Scripts

Define custom scripts in `package.json`:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack"
  }
}
```

Run scripts:

```bash
  npm run <script-name>
```

Special scripts (no `run` needed):

- `npm start`
- `npm test`
- `npm stop`
- `npm restart`

## Package Lock

`package-lock.json` ensures consistent installations across environments by locking exact versions of all dependencies
and their dependencies.

Benefits:

- Reproducible builds
- Faster installations
- Better security

This file should be committed to version control.

## Publishing a Package

1. Create an NPM account at [npmjs.com](https://www.npmjs.com)

2. Login via CLI:

```bash
  npm login
```

3. Prepare your `package.json`:

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "Package description",
  "main": "index.js",
  "keywords": [
    "keyword1",
    "keyword2"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```

4. Publish:

```bash
  npm publish
```

Update a published package:

```bash
  npm version patch  # or minor, or major
  npm publish
```

Unpublish (within 72 hours):

```bash
  npm unpublish <package-name> -f
```

## NPX

NPX is a package runner tool that comes with NPM (5.2+). It executes packages without installing them globally.

Run a package without installing:

```bash
  npx create-react-app my-app
  npx cowsay "Hello"
```

Benefits:

- No global installation clutter
- Always runs the latest version
- Test packages before installing

## Workspaces

Workspaces allow managing multiple packages in a single repository (monorepo).

Setup in root `package.json`:

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

Install dependencies for all workspaces:

```bash
  npm install
```

Run a script in a specific workspace:

```bash
  npm run test --workspace=package-a
```

## Additional Commands

Clean cache:

```bash
npm cache clean --force
```

Audit for vulnerabilities:

```bash
npm audit
```

Fix vulnerabilities automatically:

```bash
  npm audit fix
```

Install from package-lock.json exactly:

```bash
  npm ci
```

Search for packages:

```bash
  npm search <keyword>
```

Configure NPM:

```bash
  npm config list
  npm config set <key> <value>
```

## Best Practices

1. Always commit `package-lock.json`
2. Use exact versions for critical dependencies in production
3. Regularly audit and update dependencies
4. Use `.npmrc` for project-specific configuration
5. Add `node_modules` to `.gitignore`
6. Use `npm ci` in CI/CD pipelines for consistent builds
7. Review dependencies before installing
8. Keep NPM updated to the latest version

## Resources

- [Official NPM Documentation](https://docs.npmjs.com/)
- [NPM Registry](https://www.npmjs.com/)
- [Semantic Versioning](https://semver.org/)