# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

<br>

![](./public/preview.jpg)


## Table of contents
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- **Bonus**: Keep track of what's in the cart, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Mobile-first workflow
- [React](https://react.dev/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) – type safety
- [Tailwind Css](https://tailwindcss.com/) - For styles
- [Zustand](https://zustand.docs.pmnd.rs/) – cart state, persisted to localStorage
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) – checkout form and validation; Zod also validates the product data and the saved cart
- [Sonner](https://sonner.emilkowal.ski/) – toast notifications
- [Native Popover API](https://developer.chrome.com/blog/introducing-popover-api) and `<dialog>` for the cart and the order confirmation modal

## Running locally

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).


## Author

- Frontend Mentor - [@stfnpczk](https://www.frontendmentor.io/profile/stfnpczk)
- GitHub – [@stfnpczk](https://github.com/stfnpczk)