# Contributing Guidelines

## Table of Contents

-   [Getting Started](#getting-started)
-   [Testing](#testing)

## Getting Started

To get started with the project, follow the steps outlined below:

### Prerequisites (for development)

-   [Node.js LTS](https://nodejs.org/en/)

-   [Yarn](https://yarnpkg.com/)

-   [Git](https://git-scm.com/)

-   [VS Code](https://code.visualstudio.com/) or any other code editor of your choice

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository

    ```bash
    git clone https://github.com/koushikpuppala/ZuPay.git
    ```

2. Navigate to the project directory

    ```bash
    cd ZuPay
    ```

3. Rename .env.example to .env.local and fill in the required environment variables in both frontend and backend directories

    ```bash
    mv projects/frontend/.env.example projects/frontend/.env.local
    mv projects/backend/.env.example projects/backend/.env.local
    ```

4. Set the yarn version to 4.4.0 for this project

    ```bash
     yarn set version 4.4.0
    ```

5. Install the dependencies

    ```bash
     yarn install
    ```

6. Run the development server

    ```bash
     yarn dev
    ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result for the Frontend of the website.

8. Open [http://localhost:8080](http://localhost:8080) with your browser to see the result for the Backend of the website.

## Testing

The project uses the Jest and React Testing Library for unit testing and integration testing. Write tests for your code changes to ensure that they work as expected and do not introduce regressions. Run the `yarn test` to execute the test suite and verify that your changes pass all tests.
