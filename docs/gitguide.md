# Table of Contents
1. [Development Setup](#development-setup)
2. [Branching](#branching)
3. [Commit Conventions](#commit-conventions)
4. [Pull Request Process](#pull-request-process)
5. [Project Structure](#project-structure)

## Development Setup <a name="DevelopmentSetup"></a>

1. **Clone the Repository:**
```
git clone <https://github.com/UNLV-CS472-672/2026-S-GROUP4-FutureFlow>
cd <project folder>
``` 

2. **Switch from `main` into `develop` branch**
- Do not commit/push to main unless it's production ready

3. **Branch from the `develop` branch**
*More instructions will be added later on*

## Branching <a name="Branch"></a>

**Main Branches**<br>
`main` = Production Ready Code<br>
`develop` = branch for features<br>

**Supporting Branches**<br>
`feat/<feature-name>`: These branches are used for developing new features i.e `feat/login-system`<br>

`bug/<bug-name>`: These branches are used to fix bugs in the code i.e `bug/header-styling`

`hotfix/<hotfix-name>`: These branches are used to fix critical bugs [i.e hotfix/security-issue]

`release/<release-name>`: These branches are used to prepare for production release [i.e release v1.0.1]
- Naming scheme for release name: 
 - Major Edit: v2.0.0
 - Minor Edit: v2.1.0
 - Patch Edit: v2.1.1<br>

`doc/<doc-name>`: These branches are used to write, update, or fix documentation like README.md etc [i.e docs/api-endpoints]

`junk/<junk-name>`: These branches are throwaway branches used to experiment with what you're working on [i.e junk/webscrape]

## Commit Conventions <a name="Commit"></a>

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

## Pull Request Process <a name="Pull"></a>

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
2026-S-GROUP4-FUTUREFLOW<br>
├── README.md<br>
├── .gitignore<br>
└── docs<br>
    ├── PR_templates<br>
    │   ├── bug_PR_temp.md<br>
    │   ├── doc_PR_temp.md<br>
    │   └── feat_PR_temp.md<br>
    └── git_guide.md<br>
```