# Full Stack E-Commerce Website

This repository contains a full stack e-commerce website built with React.js, Node.js, Express.js, and MongoDB.

## Features

- User authentication with JWT
- Product listing, details, search, filters, and admin management
- Shopping cart with quantity updates
- Checkout workflow with Stripe payment integration
- Order history and profile management
- Responsive UI with client-side routing
- Backend REST APIs for auth, products, cart, orders, and payments

## Project Structure

```
ecommerce-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── package.json
└── README.md
```

## Setup

### Backend

1. Navigate to `server/`
2. Install dependencies: `npm install`
3. Create `.env` with the values below
4. Start server: `npm run dev`

### Frontend

1. Navigate to `client/`
2. Install dependencies: `npm install`
3. Create `.env` with the values below
4. Start app: `npm start`

## Environment Variables

### server/.env

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

### client/.env

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Deployment

- Frontend: Deploy to Netlify or Vercel from the `client/` directory.
- Backend: Deploy to Render or Railway from the `server/` directory.
- Use MongoDB Atlas for database hosting.

## Notes

- Add admin users directly in MongoDB or via the seed route.
- Product image upload is currently handled via image URLs.
