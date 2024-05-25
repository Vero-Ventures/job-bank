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

**Scripts:**

- dev: Run the development server. (npm run dev OR npm run dev --watch)
- build: Build the production application.
- start: Start the production server.
- lint: Lint the codebase using ESLint and Next.js lint rules.
- prepare: Run Husky pre-commit hooks.
- format: Format the code using ESLint and Prettier.

**Husky & Lint-Staged**

- Husky is used for Git hooks, configured to run pre-commit hooks.
- Lint-staged is configured to run ESLint and Prettier on staged files before committing.

**Dependencies:**

- @auth0/nextjs-auth0: Authentication library for Next.js applications.
- @radix-ui/react-checkbox: Component library for checkboxes.
- @radix-ui/react-icons: Component library for icons.
- @radix-ui/react-slot: Component library for slots.
- @sendgrid/mail: Library for sending emails using SendGrid.
- @stripe/stripe-js: Stripe library for client-side integration.
- @tailwindcss/forms: Tailwind CSS plugin for styling form elements.
- auth0: Auth0 client library.
- class-variance-authority: Utility library for class variance.
- clsx: Library for conditionally joining classNames.
- dotenv: Library for loading environment variables.
- lucide-react: Library for Lucide icons.
- mongoose: MongoDB ORM library for Node.js.
- next: React framework for building server-rendered applications.
- react: JavaScript library for building user interfaces.
- react-dom: React library for DOM rendering.
- react-quill: rich text editor component for React
- stripe: Stripe library for server-side integration.
- tailwind-merge: Utility library for merging Tailwind CSS classes.
- tailwindcss-animate: Tailwind CSS plugin for animations.

**DevDependencies:**

- eslint: JavaScript linter.
- eslint-config-next: ESLint configuration for Next.js projects.
- husky: Git hooks manager.
- lint-staged: Run linters on Git staged files.
- postcss: CSS post-processor.
- prettier: Code formatter.
- tailwindcss: Utility-first CSS framework.

**Notes:**

- Use [npm run dev] to start the development server.
- To apply EsLint and Prettier before committing, make sure to run > npm install or > npm i.
- Make sure to follow the linting rules defined in .eslintrc and .prettierrc.
- Environment variables are loaded using dotenv.
  Git commits trigger linting and formatting checks before being committed due to Husky and lint-staged configurations.
