This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installation

#### MongoDB

Install MongoDB Community Edition locally - [Install MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).

#### Dependencies

All other dependencies are to be installed using `npm`.

```bash
npm install
```

### Run the app

Run the MongoDB service:
[Run MongoDB Community Edition (MacOS)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)

Create a file `.env.local` with a single line containing URI, where your instance of MongoDB run. Keep in mind that the URI must have the database name at the end.

That means that e.g. my MongoDB instance run at `127.0.0.1:27017` and I want to use the database called `fanst` for this project (the database does not have to be initialized before).

```
MONGODB_URI=mongodb://127.0.0.1:27017/fanst
```

Run the development server:

```bash
npm run dev
```

For image upload, you also need a Cloudinary account - for now, I provide my account, which is set to be open for upload. Add three lines of cloudinary details to `.env.local` file:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=de0gplj3a
NEXT_PUBLIC_CLOUDINARY_API_KEY=932718483389988
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=uvxrlncm
```

Open [http://localhost:3000/experiments](http://localhost:3000/experiments) within your browser to see the result.

## Working stuff

* Only 'Experiments' tab from the main top menu works
* Create experiment, create all types of sections and questions
* Edit experiment settings
* Edit and delete sections (excluding section settings)
* Edit and delete questions
