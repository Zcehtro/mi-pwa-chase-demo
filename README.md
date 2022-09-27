# PWA-Chase-Demo

- [PWA-Chase-Demo](#pwa-chase-demo)
  - [TODO](#todo)
  - [Development](#development)
  - [Database](#database)
  - [Configure .env files](#configure-env-files)
    - [Development Environment](#development-environment)
    - [Production Environment](#production-environment)
  - [Docker](#docker)

The main goal of this project is to test and integrate the following technologies/funcionalities:

- **PWA (Progressive Web App)** on desktop and mobile
- **WebAuthn (Web Authentication)**
- MongoDB
- Mongoose
- Next.js
- React Query
- TypeScript
- Material UI
- React Hook Form
- React Geolocated
- Redux Toolkit
- Framer Motion

This project was created using [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

[View issue tracker.](https://github.com/Zcehtro/mi-pwa-chase-demo/issues)

## Development

1. Clone the repo
2. yarn install
3. Copy `.env.local.example` and rename it `.env.development.local`
4. yarn dev

## Database

The database is a [MongoDB](https://www.mongodb.com/) database, and is handled by the code using the ODM (Object-Document Mapper) [Mongoose](https://mongoosejs.com/).

## Configure .env files

The project can be configured to run services locally or remotely, according to the values set in the .env files.

### Development Environment

Configure the file `.env.development.local` with the following values:

```bash
# node
NODE_ENV=development

# WebAuthn
RP_ID=localhost

# Mongo
MONGO_URL=mongodb://localhost:27017/pwa-chase-demo
```

### Production Environment

You can set up the environment variables in the hosting service you use with the values of your production environment. For MongoDB, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

Alternatively, you can configure the file `.env.production.local` to use the external services on your production build and run the code locally on your computer.

Remember to run `yarn build` and then `yarn start` to produce and run the production build.

Set up the `.env.production.local` file with the following values:

```bash
# node
NODE_ENV=production

# WebAuthn
RP_ID=www.your-deployed-domain.com

# Mongo
MONGO_URL=mongodb+srv://your-mongo-address-on-mongodbatlas-and-with-user-password/?any-additional-options
```

## Docker

Alternatively, the project can be run locally using Docker. The Docker install script is supplied in the repo. To run locally the project we need to run Docker with Mongo image to have our database:

```bash
docker-compose up -d
```

- -d, means **detached**

You will still need to configure the `.env` file to use the local database. It is best to use the same settings described above for the development environment.
