# 🛒 বাজার দর (BazarDor)

**বাজার দর** is a Bangla-based market price information website designed to help users explore everyday product prices by category. It provides a simple, user-friendly interface for browsing market items and accessing account features.

## 🚀 Technologies Used

- **Next.js** — React framework for building the web application.
- **TypeScript** — Type-safe JavaScript for reliable development.
- **Tailwind CSS** — Utility-first CSS framework for responsive styling.
- **HeroUI** — UI components for building interactive interfaces.
- **Better Auth** — Authentication and user account management.
- **MongoDB** — Database for storing user and authentication data.
- **Programming Hero API** — API used to retrieve product categories and related market data.

## ✨ Key Features

1. **📦 Category-Based Navigation** — Browse market products through categories such as চাল, ডাল, and other everyday essentials.

2. **🔐 User Authentication** — Create an account and sign in using email and password, with Google sign-in support.

3. **👤 User Profile Management** — View account information and update your profile name.

4. **📱 Responsive Design** — Enjoy a clean, accessible interface across mobile, tablet, and desktop devices.

5. **🛍️ Category Product Browsing** — Explore products by category, with a helpful empty state and a button to return to the homepage when no items are available.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd my-bazar-bd
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure your environment variables:

   ```env
   BETTER_AUTH_SECRET=your_secure_secret
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URL=your_mongodb_connection_string
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Purpose

BazarDor aims to make market price information easier to explore through a Bangla-friendly interface, category-based browsing, and convenient user account management.

---

**Built with ❤️ using Next.js and TypeScript.**