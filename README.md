# Final Year Project Server

A robust backend server built with Node.js and Express, providing RESTful APIs for the Final Year Project application.

## 🚀 Features

- RESTful API architecture
- User authentication and authorization
- Secure password hashing with bcrypt
- JWT-based authentication
- MongoDB database integration
- File upload handling with Multer
- Email notifications with Nodemailer
- Payment processing with Stripe
- CORS enabled for cross-origin requests
- Environment variable configuration
- API input validation

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, Passport.js
- **Security:** bcryptjs
- **File Upload:** Multer
- **Email Service:** Nodemailer
- **Payment Processing:** Stripe
- **Validation:** Validator
- **Development:** Nodemon

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd finalyearproject/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Start the development server:
```bash
npm run server
```

## 📁 Project Structure

```
server/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── server.js       # Entry point
└── vercel.json     # Vercel deployment config
```

## 🔧 Available Scripts

- `npm run server` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

## 🔒 API Security

- JWT authentication for protected routes
- Password hashing using bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📝 API Documentation

The API endpoints are organized as follows:

- `/api/auth` - Authentication routes
- `/api/users` - User management routes
- `/api/payments` - Payment processing routes
- `/api/uploads` - File upload routes

## 🚀 Deployment

The server is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for serverless deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js Team
- MongoDB Team
- Stripe Team
- Node.js Community
