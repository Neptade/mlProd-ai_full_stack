# ML in Production

Our app is hosted online at: http://ml-prod.ddns.net:3000/

By: Loïc RUSSELL, Martin VIALLE, Antoine LANGE, Elliot MAISL.\
M2 Data Engineering 2, 2025.

We created this project to predict the type of flower based on the sepal/petal length/width.

## Table of contents

- [ML in Production](#ml-in-production)
  - [Table of contents](#table-of-contents)
  - [Model](#model)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Tests](#tests)
    - [Unit test](#unit-test)
    - [Integration test](#integration-test)
    - [End-to-end test](#end-to-end-test)
  - [Docker](#docker)
  - [CI](#ci)
  - [CD](#cd)
  - [DVC](#dvc)

## Model

Located in `/model` directory, the model is a simple Random Forest Classifier trained on the Iris dataset.

It uses SKLearn and MLFlow to track the model and its metrics.

## Backend

The backend, in `/backend`, is a simple Flask API that serves the model.

Start it with:
```bash
cd backend
python app.py
```

It exposes two endpoints:

- `/predict` - POST - Expects a JSON with the following format:
```json
{
    "input": [[5.1, 3.5, 1.4, 0.2]]
}
```
It supports multiple inputs to predict multiple samples at once.

Output:
```json
{
    "predictions": [0],
    "target_names": ["setosa"]
}
```

- `/train` - POST - Retrains the model with the Iris dataset.
```json
{
    "n_estimators": 100,
    "max_depth": 5
}
```

## Frontend

This is a simple React app with Vite, TailwindCSS, Shadcn, Typescript.

Start it with:
```bash
cd frontend
npm run dev
```

It will be available at `http://localhost:5173`.

## Tests

### Unit test

Unit test are located in the frontend: they are written with Jest and React Testing Library, for our React components.

Run them with:
```bash
cd frontend
npm run test
```

They include both happy and unhappy paths.

### Integration test

Because we only have two modules, integration tests between those two is strictly equal to end-to-end tests.

So instead, we decided to test the integration of the backend with the machine learning model and MLFlow.

Run them with:
```bash
cd backend
python apptest.py
```

### End-to-end test

They are located in `/e2e` and are written with Playwright. They require the frontend and backend to be running. Their URL must
be supplied through environment variables as `FRONTEND_URL` and `BACKEND_URL`.

Run them with:
```bash
cd e2e
FRONTEND_URL="http://localhost:5173" BACKEND_URL="http://localhost:5005" npx playwright test e2e.test.js
```

## Docker

The backend is dockerized and can be built with:
```bash
cd backend
docker build -t ml-in-production-backend .
```

It is based off a Python 3.11 image and exposes port 5005.

The frontend is also dockerized and can be built with:
```bash
cd frontend
docker build -t ml-in-production-frontend --build-arg VITE_API_URL=http://localhost:5005 .
```
The frontend is based off a Node 22 image and exposes port 5173.
It is a multi-stage build, and it requires the `VITE_API_URL` build argument to be set.

The final server uses the NPM `serve` package to serve the static files.

## CI

The CI/CD pipeline uses GitHub Actions and is located in `.github/workflows/`.

- On PR on branch dev: run tests
- On push to branch dev: merge to staging
- On push to branch staging: run tests, an if successful, merge to main
- On push to branch main: build docker images and push them to Docker Hub

## CD

Because our app is hosted on one of our personal servers for cost reasons, we use "watchtower" to automatically update the docker images.

Watchtower is a container that watches for changes in the docker images and automatically updates the running containers.

## DVC

- We use DVC to version the Iris dataset and the model.
- It is stored on an AWS S3 bucket.
- Because not all of us have AWS account and it was too tedious to setup, only some of us used DVC.
