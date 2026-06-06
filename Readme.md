
# blog-app Server

## Overview

blog-app Server is a Node.js and TypeScript-based backend application designed
to handle API requests efficiently. This project follows best practices in
backend development, ensuring scalability, security, and maintainability.

## Features

- Built with **Node.js** and **TypeScript**
- Uses **Express.js** for handling API requests
- **mongoDB** database integration
- **JWT authentication** for secure access
- **RESTful API** structure
- **ESLint & Prettier** for code quality and formatting

## Installation


### Prerequisites

Ensure you have the following installed:

- Node.js (>= 20.x)
- npm or yarn
- MongoDB / PostgreSQL (if applicable)

### Setup & Run

1. Clone the repository:

   ```sh
   git clone <repo link>
   cd blog-app_server
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables: Create a `.env` file in the root directory and
   configure the necessary variables:

   ```env
   PORT=5052
   DB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your_secret_key
   ```

4. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start development server         |
| `npm run build` | Build the project for production |
| `npm start`     | Run the built application        |
| `npm run lint`  | Check code formatting            |
| `npm test`      | Run tests                        |

## Folder Structure

```
📂 blog-app_server
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 @types/
│   │   │   └── 📂express/
│   │   │       └── index.d.ts
│   │   │

│   │   │
│   │   ├── 📂routes/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 seedSuperAdmin/
│   │   │   └── index.ts
│   │   └── app.ts
│   │ 
│   ├── 📂 bootstrap
│   │   └── dataSource.ts
│   │   
│   ├── 📂 config
│   │   └── index.ts
│   │
│   ├── 📂 errors
│   │   ├── 📂 base
│   │   │   ├── ApiError.ts
│   │   │   └── normalError.ts
│   │   │
│   │   ├── 📂 database
│   │   │   └── 📂 mongoose
│   │   │
│   │   ├── 📂 zod
│   │   │   └── handleZodError.ts
│   │
│   ├── 📂infrastructure/
│   │   │ 
│   │   ├── 📂 bullMQ/
│   │   │   ├── 📂queues/
│   │   │   │
│   │   │   ├── 📂workers/
│   │   │   │
│   │   │   ├── connection.ts
│   │   │   ├── handleJobFailure.ts
│   │   │   ├── init.ts
│   │   │   ├── shutdown.ts
│   │   │   └── startWorkers.ts
│   │   │ 
│   │   ├── 📂 cache/
│   │   │ 
│   │   ├── 📂 database/
│   │   │   └── db.ts
│   │   ├── 📂 http/
│   │   │   ├── 📂 express/
│   │   │   │   ├── 📂 middleware/
│   │   │   │   │   ├── auth.middleware.ts
│   │   │   │   │   ├── globalErrorHandler.ts

<!-- │   │   │   │   │   ├── optionalAuth.ts   //TODO -->
<!-- │   │   │   │   │   ├── parseBodyData.ts   //TODO -->
<!-- │   │   │   │   │   ├── uploadImage.middleware.ts   //TODO -->
<!-- │   │   │   │   │   ├── uploadVideo.middleware.ts   //TODO -->
<!-- │   │   │   │   │   ├── validateRequest.ts   //TODO -->
<!-- │   │   │   │   │   └── verifyVerificationToken.ts   //TODO -->

│   │   │ 
│   │   ├── 📂 email/
│   │   │   ├── 📂  email.provider1
│   │   │   │   ├── email.provider1.ts
│   │   │   │   └── transporter.ts
│   │   │   ├── 📂  email.provider2
│   │   │   │   ├── email.provider2.ts
│   │   │   │   └── transporter.ts
│   │   │ 
│   │   ├── 📂 payments/
│   │   │   ├── core/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── payment-provider.interface.ts
│   │   │   │   │   ├── payment-intent.interface.ts
│   │   │   │   │   ├── subscription.interface.ts
│   │   │   │   │   ├── customer.interface.ts
│   │   │   │   │   ├── refund.interface.ts
│   │   │   │   │   └── webhook.interface.ts
│   │   │   │   │
│   │   │   │   ├── types/
│   │   │   │   │   ├── payment.types.ts
│   │   │   │   │   ├── webhook.types.ts
│   │   │   │   │   └── common.types.ts
│   │   │   │   │
│   │   │   │   └── utils/
│   │   │   │       └── provider-guards.ts
│   │   │   │
│   │   │   ├── providers/
│   │   │   │   ├── stripe/
│   │   │   │   │   ├── stripe.adapter.ts
│   │   │   │   │   ├── stripe.client.ts
│   │   │   │   │   ├── stripe.mapper.ts 
│   │   │   │   │   └── stripe.webhook.ts
│   │   │   │   │
│   │   │   │   ├── revenuecat/
│   │   │   │   │   ├── revenuecat.adapter.ts
│   │   │   │   │   ├── revenuecat.client.ts
│   │   │   │   │   ├── revenuecat.mapper.ts
│   │   │   │   │   └── revenuecat.webhook.ts
│   │   │   │   │
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── registry/
│   │   │   │   └── payment.factory.ts                     
│   │   │   │
│   │   │   └── index.ts                                   
│   │   │
│   │   ├── 📂 storage/
│   │   │   ├── 📂providers/
│   │   │   └── 📂cloudinary/
│   │   │       ├── storage.interface.ts
│   │   │       └── storage.service.ts
│   │   │
│   │   └── logger.ts
│   │ 
│   ├── 📂 modules
│   │   └──📂  user/
│   │   │    ├── 📂 domain/
│   │   │    │   ├── user.entity.ts
│   │   │    │   ├── user.repository.interface.ts
│   │   │    │   └── 📂 events/
│   │   │    │       └── user-created.event.ts
│   │
│   │   │    ├── 📂 application/
│   │   │    │   ├── 📂 use-cases/
│   │   │    │   │   └── register-user.usecase.ts
│   │   │    │   │
│   │   │    │   ├── 📂 dto/
│   │   │    │   │   └── register-user.dto.ts
│   │   │    │   │
│   │   │    │   └── 📂 services/             
│   │   │    │       └── user-domain.service.ts
│   │
│   │   │    ├── 📂 infrastructure/
│   │   │    │   ├── 📂 persistence/
│   │   │    │   │   └── user.repository.ts
│   │   │    │   │
│   │   │    │   ├──📂  models/
│   │   │    │   │   └── user.model.ts
│   │   │    │   │
│   │   │    │   └── 📂 mappers/              
│   │   │    │       └── user.mapper.ts
│   │
│   │   │    ├── 📂 presentation/
│   │   │        ├── 📂 controllers/
│   │   │        │   └── user.controller.ts
│   │   │        │
│   │   │        └── 📂 routes/
│   │   │            └── user.routes.ts
│   │   │
│   │   ├── 📂 notifications
│   │   ├── 📂 Dashboard
│   │   ├── 📂 review
│   │   │
│   ├── 📂 shared/
│       ├── 📂 helpers/
│       │   ├── catchAsync.ts
│       │   ├── pagination.ts
│       │   └── sendResponse.ts
│       │
│       ├── 📂 interface/
│       │   └── index.ts
│       │
│       ├── 📂 types/
│       │   └── common.types.ts
│       │
│       ├── 📂 utils/
│       │   ├── 📂emailTemplates/
│       │   ├── accountStatusGuard.ts
│       │   ├── extractBearerTokens.ts
│       │   ├── generateOtp.ts
│       │   ├── generateUniqueString.ts
│       │   ├── jwt.ts
│       │   └── slugify.ts
│       │
│       ├── 📂 validation/
│           ├── id.validation.ts
│           ├── pickValidFields.ts
│           └── searchFilter.ts
│   
├── server.ts
├── dockerignore
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── .env.example
├── docker-compose.yml
├── docker-entrypoint.sh
├── Dockerfile
├── jest.config.js
├── prisma.config.ts
├── package.json
├── tsconfig.json
├── README.md
```

## API Documentation

🚧 **Coming Soon**

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request

## License

This project is licensed under the **MIT License**.
