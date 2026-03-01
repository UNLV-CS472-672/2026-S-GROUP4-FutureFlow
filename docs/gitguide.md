# Table of Contents
1. [Development Setup](#development-setup)
2. [Github Workflow](#github-workflow)
3. [Branching](#branching)
4. [Commit Conventions](#commit-conventions)
5. [Pull Request Process](#pull-request-process)
6. [Project Structure](#project-structure)

## Development Setup

**1. Clone the Repository:** <br>
```
git clone <https://github.com/UNLV-CS472-672/2026-S-GROUP4-FutureFlow>
cd <project folder>
``` 

**2. Checkout the Development Branch** <br>
We don't work directly on main. All development happens on `develop`
```
git checkout develop
git pull origin develop
```

**3. Create your feature branch** <br>
Always branch off of `develop` when starting new work
```
Example: git checkout -b feat/your-feature-name
```

**4. Install Project Dependencies** <br>

*More instructions will be added later on*

## Github Workflow
We'll use a two-main-branch workflow:
### Branches We Use <br>
`main` (Production):
- Only holds **production-ready** code
- Do not push directly to `main`
- `main` should always be in a deployable state
- Changes only come in through reviewed PRs from `release/*` or `hotfix/*` <br>

`develop` (Integration/Active Development) <br>
- Where completed features and fixed are merged together and tested before being pushed to `main`
- Supporting branches branch off from here
- `develop` can be "in progress," but should still be buildable and reasonably stable

Note: Please refer to [Branching](#branching) to view supporting branches scheme

### Workflow Instructions
1. Sync `develop` <br>
```
# Switches your branch to develop
git checkout develop 

# Downloads the latest changes from GitHub
# Then merges the changes into your local develop
git pull origin develop
```

2. Create a branch <br>
```
git checkout -b feat/your-feature
# just an example, could be bug/..., doc/..., etc
```

3. Commit your changes <br>
```
git add .
git commit -m "your message here" 
```
*Note: Look at [Commit Conventions](#commit-conventions) for commit messages*

4. Push your branch <br>
```
# -u sets the upstream tracking branch
# it connects your local branch to the remote branch
git push -u origin feat/your-feature
```

5. Open a PR into `develop` <br>
- Target branch should be `develop`
- Have 2 people review your PR
- Ensure it passes the tests/build pass

### Forking
We won't need to fork for our repo because it's mainly for contributors who don't have write access. Since our team members all have admin access and are collaborating in the same repo, then our approach will follow: branches in same repo + PRs + reviews. It helps keep everything centralized and avoids the overhead + confusion of multiple forks

## Branching

### Main Branches<br>
`main` = Production Ready Code<br>
`develop` = branch for features<br>

### Supporting Branches<br>
All supporting branches should be created from `develop`, except in special cases noted below<br>

`feat/<feature-name>`: These branches are used for developing new features i.e `feat/login-system`<br>
**Flow:** `develop` -> `feat/...` -> PR into develop <br>

`bug/<bug-name>`: These branches are used to fix bugs in the code i.e `bug/header-styling` <br>
**Flow:** `develop` -> `bug/...` -> PR into develop <br>

`doc/<doc-name>`: These branches are used to write, update, or fix documentation like README.md etc [i.e docs/api-endpoints] <br>
**Flow:** `develop` -> `doc/...` -> PR into develop <br>

`junk/<junk-name>`: These branches are throwaway branches used to experiment with what you're working on [i.e junk/webscrape] <br>
*Note: If it becomes real work, create a proper `feat/` or `bug/` branch and PR that instead* <br>
**Flow:** `develop` -> `junk/...` 

`release/<release-name>`: These branches are used to prepare for production release [i.e release v1.0.1]
 - Naming scheme for release name: 
 - Major Edit: v2.0.0
 - Minor Edit: v2.1.0
 - Patch Edit: v2.1.1<br>

**Flow:**
1. Create from `develop`: `develop` -> `release/vX.Y.Z`
2. Only do release-related work here (version bump, final testing, documentation updates)
3. PR `release/vX.Y.Z` -> `main` 
4. After merging into main, open a new PR back so `develop` stays up to date

`hotfix/<hotfix-name>`: These branches are used to fix critical bugs [i.e hotfix/security-issue] <br>
**Flow:** 
1. Create from `main`: `main` -> `hotfix/...`
2. PR `hotfix/...` -> `main` ASAP
3. Open PR to merge hotfix into `develop` so the fix isn't lost

## Commit Conventions

We'll be following this structure for our commits: `type(scope): short description`

**Types:** <br>
`feat:` Commits that add, adjust or remove a new feature to the API or UI<br>
`fix:`Commits that fix an API or UI bug (correlates with `patch` for versioning)<br>
`test:` Commits that add missing tests or correct existing ones<br>
`style:` Commits that address code style (i.e white-space, formatting, etc) and don't affect application behavior<br>
`docs:` Commits that affect documentation<br>
`build:` Commits that affect build-related components like project version, dependencies, etc <br>
`ops:` Commits that affect operational aspects like CI/CD pipelines, deployment scripts, etc <br>
`chore:` Commits for administrative/supportive tasks that don't impact production code like modifying<br>
`.gitignore`, renaming files, etc

**Scope:** This is optional but it helps clarify what type of commits you're making; it adds contextual info. A scope is and MUST be a noun describing the section you're working on 

**Examples:** 
- `build(release): bump version to 2.0.0`
- `feat(button): added a button`
- `style: removed empty lines`

## Pull Request Process

**General Requirements**
Each PR must:
- have a clear title
- include a short description
- target the correct base branch
- pass CI checks
- be reviewed by 2 team members

**PR Templates**
There are structured PR templates to help with ease and maintain consistency, so before submitting your PR:

1. Choose the appropriate template
 - Feature Addition
 - Bug Fix 
 - Documentation

2. Complete the sections for the template [doesn't have to be long]

**!! Please do not push directly to main !!**

## Project Structure <a name="struct"></a>
```
2026-S-GROUP4-FUTUREFLOW
├── README.md
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── app
│   ├── api/ # Backend
│   ├── web/ # Frontend
│   └── ui-prototype/ # Figma/UI prototype assets
├── docs
│   ├── PR_templates/ # Pull Requests Templates
│   └── git_guide.md
└── packages/ #Shared Utilities
```