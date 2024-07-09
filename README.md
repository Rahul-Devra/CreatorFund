# CreatorFund

CreatorFund is  a responsive crowdfunding platform using Next.js and TailwindCSS, enabling creators to create profiles for fans to discover and support financially.

## Features

- **User Authentication:** Secure user authentication using NextAuth.js.
- **Intuitive Interface:** Clean and user-friendly UI built with TailwindCSS.
- **Responsive Design:** Ensures a seamless experience across devices.
- **Database:** MongoDB for persistent data storage.

## Tech Stack

- **Frontend:** Next.js, React.js, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** NextAuth.js
- **Encryption:** AES-256-CBC

## Prerequisites

Ensure you have the following installed and set up before proceeding:

- **Node.js:** Ensure Node.js is installed (version >= 12.0.0). You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB:** Install and configure MongoDB. You can download it from [mongodb.com](https://www.mongodb.com/).
- **Environment Variables:** Set up environment variables for MongoDB connection and encryption keys.
- **NextAuth.js:** Configure NextAuth.js for authentication.
- **TailwindCSS:** Setup TailwindCSS for styling.
- **AES-256-CBC Encryption:** Implement encryption and decryption for secure data handling.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rahul-Devra/SafePass.git
   cd SafePass
2. ## Install Dependencies
   Install the necessary dependencies using npm or yarn:
   ```bash
   npm install next react react-dom tailwindcss mongoose next-auth
   # or
   yarn add next react react-dom tailwindcss mongoose next-auth
3. ## Start Development Server
   Once the dependencies are installed, you can start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
4. ## Open your browser and navigate to localhost.

## Deployment

This project is configured to be deployed on platforms like Vercel or Heroku. 
Make sure to set up environment variables for production deployment.

## Contributing

Contributions are welcome! To contribute to SafePass, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch from `main`.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the `main` branch of the original repository.
