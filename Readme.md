# REST API with Node.js, TypeScript & PostgreSQL

This project is a simple yet complete RESTful API built using **Node.js**, **TypeScript**, and **PostgreSQL**. It simulates an electronic product database for a fictional store, providing a single route for creating products. The API is designed with scalability in mind, includes testing with **Jest** and **Supertest**, and is fully documented using **Swagger**.

## Features

- **Express.js** server built with TypeScript.
- **PostgreSQL** as the database for storing electronic products.
- API endpoints to **create products** in the database.
- **Swagger** documentation for easy API exploration.
- **Jest** and **Supertest** tests for API endpoint validation.
- Deployed and accessible via **Render**.

## Live Demo

You can access the live deployment of the API with the full Swagger documentation at the following link:

[Live API with Swagger Documentation](https://rest-api-node-typescript-ke5s.onrender.com/docs/)

This will open the Swagger UI, where you can explore the available endpoints and test the API directly.

### Example Endpoints:

- GET /api/products: Retrieve all products in the store.
- POST /api/products: Create a new product in the store.
- PUT /api/products/:id: Update a product by its ID.
- PATCH /api/products/:id: Update de property `"availability"`.
- DELETE /api/products/:id: Delete a product by its ID.

Visit the Swagger UI to explore and test all the endpoints interactively.

## Installation (Optional)

- Node.js (>=16.x)
- PostgreSQL

  ### Steps

  1. Clone the repository:

  ```bash
    git clone https://github.com/habidbesp/rest-api-node-typescript-server.git

    cd rest-api-node-typescript-server
  ```

  2. Install dependencies:

  ```bash
    npm install
  ```

  3. Create a `.env` file in the root directory with the following variable (adjust as needed for your environment):

  ```env
    DATABASE_URL=your_postgresql_database_url
  ```

  4. Run the development server:

  ```bash
    npm run dev
  ```

  This will start the server with Nodemon, and the API will be available at http://localhost:4000.

## API Documentation

- The API is fully documented using `Swagger`. You can access the documentation by navigating to:

  ```bash
    http://localhost:4000/docs
  ```

  This will open the Swagger UI, where you can explore the available endpoints.

## Testing

To run tests with Jest and Supertest:

```bash
npm run test
```

To run tests with coverage:

```bash
npm run test:coverage
```

This will execute the tests and provide a detailed coverage report.

## Technologies Used

- **Node.js** and Express for the server.
- **TypeScript** for type safety and development efficiency.
- **PostgreSQL** as the database.
- **Sequelize ORM** for interacting with the database.
- **Swagger** UI and Swagger JSDoc for API documentation.
- **Jest** and **Supertest** for testing.
- **dotenv** for environment variable management.

## Future Plans

A frontend application for this API is currently in development using React and TypeScript. The frontend will provide a user-friendly interface to interact with the product data and enhance the functionality of this server. Stay tuned for updates!

## License

This project is licensed under the ISC License
