# Zupay Assignment - Blog Application

## Overview

This project is part of the Zupay Assignment, where the goal is to create a simple blog application. The application allows users to view, create, edit, and delete blog posts. It also includes features such as user authentication, commenting, and search functionality.

## Tech Stack

-   **Frontend**: [Next.js](https://nextjs.org/)
-   **Backend**: [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)

## Features

### 1. User Authentication

-   **Login**: Users can log in using their email and password at the `/login` route.
-   **Registration**: New users can register at the `/register` route by providing their full name, email, password, and confirming the password.
-   **Password Reset**: Users can reset their password at the `/reset` route by entering their email. A password reset link will be sent to their email.

### 2. Blog Posts

-   **View Posts**: All users can view blog posts without logging in at the `/posts` route.
-   **Create Post**: Logged-in users can create new posts at the `/create` route by providing a title and content. If a user is not logged in, they will see the message "You need to be logged in to create a post."
-   **View My Posts**: Logged-in users can view all the posts they have created at the `/my-posts` route. This page is protected and only shows the user's posts.
-   **View Post Details**: Users can click on any post to view its full content on a separate page. If logged in, users can comment on the post and see other users' comments. If not logged in, they will see the message "You must be logged in to comment."
-   **Edit and Delete Post**: From the `/my-posts` page, users can click on any of their posts to view, edit, or delete the post.

### 3. Comments

-   **Commenting**: Logged-in users can comment on any post. Users can also delete their comments if needed.
-   **Comment Management**: Post authors can see all comments on their posts from the `/my-posts` page and manage them accordingly.

### 4. Search Functionality

-   **Search**: Users can search for posts on both the `/posts` and `/my-posts` pages.

## Backend Implementation

### Error Handling:

Zod is used to validate the request body parameters. The following error handlers are implemented in the backend:

-   **Error Handler**: Handles all errors and sends a response with the appropriate status code and error message.
-   **Not Found Handler**: Handles all requests to non-existent routes and sends a response with a 404 status code and error message.
-   **Validation Errors**: Handles validation errors and sends a response with a 400 status code and error message.
-   **Authentication Errors**: Handles authentication errors and sends a response with a 401 status code and error message.
-   **MongoDB Errors**: Handles MongoDB errors and sends a response with a 500 status code and error message.

### Comments Router:

-   **GET** `/comments/:id`: Retrieves comments for a specific post.
-   **POST** `/comments/:id`: Creates a comment for a specific post, with token verification. (Protected Route)
-   **DELETE** `/comments/:id`: Deletes a specific comment, with token verification. (Protected Route)

### Posts Router:

-   **GET** `/posts`: Retrieves all posts.
-   **GET** `/posts/my-posts`: Retrieves posts created by the authenticated user. (Protected Route)
-   **GET** `/posts/my-posts/:id`: Retrieves a specific post created by the authenticated user. (Protected Route)
-   **GET** `/posts/:id`: Retrieves a specific post.
-   **POST** `/posts`: Creates a new post, with token verification. (Protected Route)
-   **PUT** `/posts/:id`: Updates a specific post, with token verification. (Protected Route)
-   **DELETE** `/posts/:id`: Deletes a specific post, with token verification. (Protected Route)

### Users Router:

-   **GET** `/users`: Retrieves all users.
-   **GET** `/users/:id`: Retrieves a specific user.
-   **POST** `/users`: Creates a new user, with token verification. (Protected Route)
-   **PUT** `/users/:id`: Updates a specific user, with token verification. (Protected Route)
-   **DELETE** `/users/:id`: Deletes a specific user, with token verification. (Protected Route)

### Middleware:

-   **Auth Middleware**: Verifies the user's token for protected routes.

### Models:

-   **Comment Model**: Represents a comment with the following fields: `postId`, `user`, `uid`, `comment`, `createdAt`, and `updatedAt`.

-   **Post Model**: Represents a post with the following fields: `title`, `content`, `author`, `uid`, `createdAt`, and `updatedAt`.

-   **User Model**: Represents a user with the following fields: `uid`, `name`, `email`, `createdAt`, and `updatedAt`.

## Installation and Setup

Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed instructions on how to set up the project locally.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contributors

-   **[Koushik Puppala](https://koushikpuppala.com/)** - _Founder & Developer_ - [GitHub](

## 📬 Contact

-   [Koushik Puppala](https://koushikpuppala.com/)
-   [Email](mailto:message@koushikpuppala.com)
-   [LinkedIn](https://www.linkedin.com/in/koushikpuppala/)
-   [GitHub](https://github.com/koushikpuppala)
