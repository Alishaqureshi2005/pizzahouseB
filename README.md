# Pizza Authentication System

A complete authentication system with user and admin roles for a pizza delivery application.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control (User/Admin)
- Password hashing with bcrypt
- Input validation
- Error handling
- Admin user management
- Protected routes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pizza-auth
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Admin Routes

- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get single user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PUT /api/admin/users/:id/role` - Update user role

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- Error handling middleware
- CORS enabled
- Environment variables for sensitive data

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Server errors

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Production

To run the server in production mode:
```bash
npm start
```

## License

MIT 