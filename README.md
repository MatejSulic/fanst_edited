This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installation

#### MongoDB

* Install MongoDB Community Edition locally - [Install MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).

* Run the MongoDB service:
[Run MongoDB Community Edition (MacOS)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition).

* Create a file `.env.local` with a single line containing URI, where your instance of MongoDB run. Keep in mind that the URI must have the database name at the end. That means that e.g. my MongoDB instance run at `127.0.0.1:27017` and I want to use the database called `fanst` for this project (the database does not have to be initialized before).

```
MONGODB_URI=mongodb://127.0.0.1:27017/fanst
```

#### Cloudinary

* Create a Cloudinary free account (https://cloudinary.com/).
* Login into the account and copy the "cloud_name" to file `.env.local` into the variable `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=--paste-here--`.
* Go to Cloudinary settings (https://console.cloudinary.com/settings/) -> Upload -> Upload Presets and create a new Unsigned upload preset. You can leave all other options except "Unsigned" with no changes.
* Copy the Upload Preset name into variable `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=--paste-here--` in the `.env.local.` file.

#### Authentication

* Go to the repository root folder (folder `fanst`).
* Generate JWT private key - `openssl genrsa -out jwtRS256.key 2048`.
* Generate JWT corresponding public key - `openssl rsa -in jwtRS256.key -pubout -out jwtRS256.key.pub`.

#### Dependencies

Your file `.env.local` should look like this:

```
MONGODB_URI=---Mongodb-URI---
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=---Cloudinary-Cloud-Name---
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=---Cloudinary-Upload-Preset---
```

All other dependencies are to be installed using `npm`.

```bash
npm install
```

### Run the app

Run the server:

```bash
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) within your browser.
