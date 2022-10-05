# PWA-Chase-Demo

- [PWA-Chase-Demo](#pwa-chase-demo)
  - [TODO](#todo)
  - [Requirements and install instructions](#requirements-and-install-instructions)
    - [Requirements](#requirements)
    - [Installation: general settings](#installation-general-settings)
    - [Installation: development environment](#installation-development-environment)
    - [Installation: production environment](#installation-production-environment)
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
- TypeScript
- Material UI
- React Hook Form
- React Geolocated
- Redux Toolkit
- Framer Motion

This project was created using [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [ ] Add recognition for multiple devices per user

For all tasks, open and closed, view the [issue tracker](https://github.com/Zcehtro/mi-pwa-chase-demo/issues).

## Requirements and install instructions

### Requirements

- Git
- Node.js
- Yarn
- MongoDB
- Docker (optional, in case MongoDB is not installed)

### Installation: general settings

1. Clone the repo with git or your preferred method.
2. Install all repo dependencies with yarn by typing `yarn install` in the terminal.
3. (Optional) In case you want to use Docker to run MongoDB locally, read the instructions [here](README.md#docker).

### Installation: development environment

To work on the project, after following the [Installation: general settings](README.md#installation-general-settings) instructions, follow these steps:

1. Copy `.env.local.example` and rename it `.env.development.local`
2. Configure the `.env.development.local` file with your settings according to the instructions [below](README.md#configure-env-files).
3. Run the project in development environment by typing `yarn dev` in the terminal.

### Installation: production environment

If you want to build a production version of the project, after following the [Installation: general settings](README.md#installation-general-settings) instructions, follow these steps:

1. Copy `.env.local.example` and rename it `.env.production.local`
2. Configure the `.env.production.local` file with your settings according to the instructions [below](README.md#configure-env-files).
3. Type `yarn build` and then `yarn start` in the terminal.

## Database

The database is a [MongoDB](https://www.mongodb.com/) database, and is handled by the ODM (Object-Document Mapper) [Mongoose](https://mongoosejs.com/).

If you don't have it installed, follow the [install instructions here](README.md#requirements-and-install-instructions) to install it or use Docker.

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
