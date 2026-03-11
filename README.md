# 2026-S-GROUP4-FutureFlow
FutureFlow is a SPA web application designed to help users explore education and career pathways. 

# Project Structure
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

# Getting Started

### 1. Install Dependencies
From the project root:
`pnpm install`

### 2. Run the Backend
```
cd app/api
pnpm dev
```
The API runs on `http://localhost:3000`

### 3. Run the Frontend
```
cd app/web
pnpm dev
```
Frontend runs on: `http://localhost:5173`

## Notes
- Always run `pnpm install` from the root
  - Don't run the command inside subfolders