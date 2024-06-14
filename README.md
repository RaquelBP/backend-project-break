# Final Backend Project of the Full Stack Bootcamp

## Overview
This is the final backend project consisting of setting up a clothing store with a product catalogu and a dashboard to manage the store that requires authentication The products are stored in a database in Atlas.

The project's goal is to put into a final project everything learnt throughout the backend module.

## Prerequisites
- Node.js (v20.12.2)
- npm (v10.5.0)
- MongoDB (v7.0.11)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`PORT`

`API_KEY`


## Installation

Clone the project

```bash
  git clone https://github.com/RaquelBP/backend-project-break.git
```

Go to the project directory

```bash
  cd backend-project-break
```

Install the dependencies of the project with npm

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Endpoints

- GET /products: Get all products.
- GET /products/:productId: Get details of a specific product.
- GET /products/filter/:category: Get all products of a specific category.
- GET /dashboard: Dashboard of the admin displaying all products.
- GET /dashboard/new: Admin form to create a new product.
- POST /dashboard: Create a new product.
- GET /dashboard/:productId: Dashboard of the admin of a specific product.
- GET /dashboard/:productId/edit: Admin form to edit a specific product.
- PUT /dashboard/:productId: Update a specific product.
- DELETE /dashboard/:productId/delete: Delete a specific product.
- POST /login: Authenticate admin user.
- POST /logout: Logout admin user.
- POST /register: Register a new admin user.
