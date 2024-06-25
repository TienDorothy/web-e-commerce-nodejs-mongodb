# Project Name: E-commerce Website

## Project Overview
### The e-commerce website project consists of two web pages: client and admin.
### The backend server
Handles data management, user authentication, order processing, and email notifications. It is responsible for interacting with the database, handling HTTP requests from the client and admin pages, managing user sessions and authentication tokens, as well as sending emails to customers upon order creation. Additionally, it communicates with Firebase for image storage.

The main functionalities of the backend include:
- Data management: Interacting with the database (MongoDB) to store and retrieve product information, user data, and order details.
- User authentication: Implementing authentication mechanisms to validate user credentials, manage user sessions, and generate authentication tokens.
- Order processing: Handling order creation, updates, and order history retrieval.
- Email notifications: Sending email confirmations to customers when orders are successfully placed.
- Image storage: Interacting with Firebase to store and retrieve images for products.

### Features
- User Authentication: Validate email, check email accounts before creation.
- Users can:
  - Register an account and place orders.
  - View product information and place orders.
  - Update orders.
  - Review order history.
  - Receive email confirmation when placing an order.
- Admin Panel for data management.
- Image upload mechanism to the server, allowing product creation.

## Technologies Used
### Backend
[Backend](http://3.25.135.78)

[Link test backend](http://3.25.135.78/api/product/products)

- Express.js
- MongoDB
- AWS
- Multer
- Firebase
### Frontend: Client and Admin
[Web e commerce preview](https://e-commerce-client-react.vercel.app/)

[Admin web preview](https://admin-e-commerce-nodejs-mongodb.vercel.app/)

- React
- Tailwind CSS
- DaisyUI
- Redux Toolkit
- React Router



### Authentication and Authorization
Authentication and authorization of users are implemented using session and token-based authentication mechanisms.

## Deploy
### Frontend: on [Vercel](https://vercel.com/)
### Backend: on [AWS](https://aws.amazon.com)
