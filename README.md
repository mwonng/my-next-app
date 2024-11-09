This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or any package management tool
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project intro

- `/profile`, this page is protected page and only accessible when you have `username` and `jobTitle` in cookies
- `/login`, this is the page allow you to simulate login but without password, this can add `username` and `jobTitle` to cookies
- `/characters`, this page is for list all characters from public API with pagination on the bottom of the page. This is also a protected page.
- `/characters/2`, this page is for list paginated characters from public API by page number.

## How to persist data

There are a lot of way to persist data for `username` and `jobTitle` locally. It call be `sessionStorage` or `localStorage` or `cookies` etc..

I choose cookie as my localStorage as it able to be encrypted via SSL, consider it simulate login so it more suitable by using cookies.
