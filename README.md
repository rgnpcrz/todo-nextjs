
# Project Setup Guide

## Getting Started Locally

### Prerequisites
To get started, you will need the following installed on your device:

- **Node.js**: Please make sure that Node.js is installed. This project was developed using Node.js v20.12.1, so it is recommended to use this version to avoid any version-related issues.
- **PostgreSQL**: You need a PostgreSQL database set up locally or on a remote server. Create a new database to use with the project.

### Setting Up the Project

1. **Clone the repository**:
   Clone this project to your local machine by running:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**:
   Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   In the root of the project, create a `.env` file and update it with your PostgreSQL database connection string:

   ```env
   DATABASE_URL="your-db-connection-string"
   ```

4. **Set up the database**:

   You can quickly set up the project and the database by running:

   ```bash
   npm run dev:setup
   ```

   This script will handle the project and database initialization for you.

   > If you encounter any errors or prefer to do things manually, you can follow the steps below.

5. **Manual Setup**:

   If you prefer or need to set up manually, run the following commands in the order listed:

   ```bash
   npm install
   npx prisma migrate dev
   npm run dev
   ```

### Running the Project

After setting everything up, you can run the project with:

```bash
npm run dev
```

This will start the development server and you can access the application locally.

### Node.js Version

This project was developed and tested with Node.js v20.12.1. If you run into any issues related to Node.js version, consider using this specific version for local development.

---

## Troubleshooting

If you face any issues during setup, here are some common solutions:

1. **Prisma Client Generation**:
   Ensure that the Prisma Client is generated correctly. You can do so by running:

   ```bash
   npx prisma generate
   ```

2. **Database Connection Issues**:
   Double-check the `DATABASE_URL` in your `.env` file and ensure your PostgreSQL server is running.

3. **Outdated Dependencies**:
   If you encounter errors related to packages, try running:

   ```bash
   npm update
   ```

---

Happy coding! 🚀
