## **Project Description**

This project aims to build a job site network, allowing multiple front-end job boards to display listings from a central backend based on user-defined settings. This network will:

- **Support underserved communities:** Job posting companies can promote roles across specialized job boards through a single admin panel, improving access for diverse applicant pools.
- **Reduce redundancy:** The system will automatically scrape jobs from existing boards, notifying job posters of cross-postings and prompting account activation. This streamlines cross-posting and aligns with government initiatives for broader job promotion.
- **Enhance accessibility:** The system focuses on accessibility and community engagement.
- **Improve job descriptions:** Leverage Large Language Model (LLM) APIs to empower users to create more compelling job posting descriptions.

## **Programming Language(s)**

This web-based job portal will utilize:

- **Front-end:** React
- **Backend:** MongoDB
- **External APIs:**
  - Stripe for payment processing
  - OpenAI for LLM functionalities
  - Auth0 for user authentication

## **Hardware/Software Requirements**

- **Frontend Development:** React
- **Backend Database Management:** MongoDB
- **Version Control:** GitHub
- **Development Environment:**
  - IDE suitable for React development
  - Web browser for testing
- **Computational Resources:** Cloud-based infrastructure and servers to host the job boards and admin panel.

## **Current Work/Arrangement**

Currently, job postings are often restricted to individual platforms, limiting exposure to a wider range of potential candidates. This often necessitates manual cross-posting across multiple platforms, leading to repetitive and time-consuming work.

## **Project Setup Note**

**Project Overview:**
Name: job-bank

## Installation

To install the project, clone the repository and run `npm install` to install all dependencies:
**Notes:** This is a React + Next.js project. Please follow these steps to run the project.

- Clone the repository (git clone https://github.com/your-username/job-bank.git). Navigate to root folder (cd job-bank)
- Add the ‘ .env.local’ file to the project.
- Run ‘npm install’ or ‘npm i’ to install dependencies/packages
- Run ‘npm run dev’ to see changes in the local development environment
- To apply EsLint and Prettier before committing, run > npm install or > npm i.
- Make sure to follow the linting rules defined in .eslintrc and .prettierrc.
- Environment variables are loaded using dotenv.
- Run ‘npm run build’ before merging to main to ensure there are no build errors before deployment
- Git commits trigger linting and formatting checks before being committed due to Husky and lint-staged configurations.
- To run the playwright tests use 'npx playwright test' this will the test directory defined in the playwright.config.ts
- To run the coverage report `npm run coverage`

**Scripts:**

- dev: Run the development server. (npm run dev OR npm run dev --watch)
- build: Build the production application.
- start: Start the production server.
- lint: Lint the codebase using ESLint and Next.js lint rules.
- prepare: Run Husky pre-commit hooks.
- format: Format the code using ESLint and Prettier.
- jest: run jest tests in the e2e folder for testing
- coverage: generates a coverage report after running jest tests

**Husky & Lint-Staged**

- Husky is used for Git hooks, configured to run pre-commit hooks.
- Lint-staged is configured to run ESLint and Prettier on staged files before committing.

**Dependencies**

- `@auth0/nextjs-auth0`: Authentication library for Next.js applications.
- `@heroicons/react`: Heroicons for React.
- `@radix-ui/react-checkbox`: Component library for checkboxes.
- `@radix-ui/react-dialog`: Component library for dialogs.
- `@radix-ui/react-icons`: Component library for icons.
- `@radix-ui/react-label`: Component library for labels.
- `@radix-ui/react-select`: Component library for selects.
- `@radix-ui/react-slot`: Component library for slots.
- `@sendgrid/mail`: Library for sending emails using SendGrid.
- `@stripe/stripe-js`: Stripe library for client-side integration.
- `@tailwindcss/forms`: Tailwind CSS plugin for styling form elements.
- `auth0`: Auth0 client library.
- `axios`: Promise-based HTTP client for the browser and Node.js.
- `babel`: JavaScript compiler.
- `babel-plugin-istanbul`: Babel plugin for code coverage.
- `class-variance-authority`: Utility library for class variance.
- `classnames`: Utility for conditionally combining class names
- `clsx`: Library for conditionally joining classNames.
- `dotenv`: Library for loading environment variables.
- `lucide-react`: Library for Lucide icons.
- `mongoose`: MongoDB ORM library for Node.js.
- `next`: React framework for building server-rendered applications.
- `node-cron`: Module for scheduling tasks.
- `puppeteer-extra`: Extended version of Puppeteer.
- `puppeteer-extra-plugin-stealth`: Plugin to make Puppeteer stealthier.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: React library for DOM rendering.
- `react-quill`: Rich text editor component for React.
- `stripe`: Stripe library for server-side integration.
- `tailwind-merge`: Utility library for merging Tailwind CSS classes.
- `tailwindcss-animate`: Tailwind CSS plugin for animations.
- `ts-node`: TypeScript execution environment for Node.js.

**DevDependencies:**

- `@jest/globals`: Jest globals for TypeScript.
- `@playwright/test`: Playwright testing library.
- `@types/jest`: TypeScript definitions for Jest.
- `@types/node`: TypeScript definitions for Node.js.
- `@types/puppeteer`: TypeScript definitions for Puppeteer.
- `@types/react`: TypeScript definitions for React.
- `eslint`: JavaScript linter.
- `eslint-config-next`: ESLint configuration for Next.js projects.
- `husky`: Git hooks manager.
- `jest`: JavaScript testing framework.
- `jest-playwright-preset`: Jest preset for Playwright.
- `lint-staged`: Run linters on Git staged files.
- `playwright`: End-to-end testing library.
- `postcss`: CSS post-processor.
- `prettier`: Code formatter.
- `puppeteer`: Headless Chrome Node.js API.
- `tailwindcss`: Utility-first CSS framework.
- `ts-jest`: TypeScript preprocessor with source map support for Jest.
- `typescript`: TypeScript language.

**DevOps Notes**

- In the main.yaml, the Docker Image is currently being uploaded to a personal Docker Hub repo (Account name is cassidyboilley099 and repo is job-bank)
- There will be a need to add more qa tests for the app as the current coverage sits around 0% as jest doesnt consider e2e testing.
- The ACTIONS_TOKEN is currently my PAT, a new token will need to be made. The same applies to the DOCKER_PASSWORD and DOCKER_USERNAME.
  To modify these go to the repo -> Settings -> Secrets and Variables -> Actions
  ^^
  This will require admin access to the repository

- Testing is done through Playwright and Jest. Unit tests should be made with Jest so that coverage can be done. However playwright is easier to use for end-to-end testing but doesn't currently register on coverage reports.

- The current playwright tests need to be updated to function with the current code as it was changed. Playwright does have a VSCode extension that you can use. Additionally if you want to run a Playwright browser instance use `npx playwright codegen YOUR_URL` and it lets click on the elements.
