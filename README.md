# Notion Project

![notion1](https://github.com/user-attachments/assets/dafa5647-4f53-4b4d-93c1-22d6972a5e0a)
![notion2](https://github.com/user-attachments/assets/919f1218-899a-4b10-a8a5-d6cbc461e62c)
![notion3](https://github.com/user-attachments/assets/024d986e-b42d-4a62-8566-8127dec2a184)
![notion4](https://github.com/user-attachments/assets/05547c05-1146-449e-870a-c081f9de468a)

## Project Structure

```
/app
  ├── /client
  ├── /server
  └── /shared
```

This project is structured into three main directories: **client**, **server**, and **shared**. Each directory serves a specific purpose in the overall architecture of the application.

## Directories Overview

- **/app/client**: This directory contains the client-side code built with React. It utilizes `react-router-dom` for routing.

- **/app/server**: This directory contains the server-side code built with Express. It connects to a MongoDB database and includes authentication features using `jsonwebtoken` and `bcrypt`.

- **/app/shared**: This directory is intended for shared code and types between the client and server, utilizing TypeScript and Zod for validation.

## Getting Started

To get started with this project, follow these steps:

1. **Install Dependencies**: 
   Navigate to the root `/app` directory and run the following command to install the necessary packages for both client and server:

   ```bash
   npm install
   ```

   After that, navigate to each of the subdirectories (client, server, and optionally shared if it has its own dependencies) and run:

   ```bash
   npm install
   ```

   This ensures that all dependencies are installed correctly in both the root and individual directories.

2. **Run the Project**: 
   To start the development server, navigate to the `/app` directory and run:

   ```bash
   npm run dev
   ```

   This command will start both the client and server in development mode.

## Tech Stack

- **Client**: 
  - React
  - React Router DOM

- **Server**: 
  - Express
  - MongoDB
  - JSON Web Token (`jsonwebtoken`) for authentication
  - Bcrypt for password hashing

- **Shared Code**:
  - TypeScript
  - Zod

## Conclusion

This project combines a modern tech stack with a clear separation of concerns between client and server code. The use of TypeScript and Zod ensures type safety and validation across both sides of the application. Additionally, the implementation of authentication features using `jsonwebtoken` and `bcrypt` enhances security. 
