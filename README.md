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

Run the MongoDB daemon / service:
[Run MongoDB Community Edition (MacOS)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)

Create a file `.env.local` with a signle line containing uri, where your instance of MongoDB run.

E.g.
```
MONGODB_URI=mongodb://127.0.0.1:27017/fanst
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/experiments](http://localhost:3000/experiments) with your browser to see the result.

## Working stuff

Only Experiments tab from the main top menu works. Creating experiments, creating sections and creating questions work. Everything else has just static data for now...
