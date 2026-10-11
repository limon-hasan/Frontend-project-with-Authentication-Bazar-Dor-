# 🛒 BazarDor (বাজার দর)

> A modern, responsive real-time daily grocery and commodity price tracking platform.

**BazarDor** is a production-grade web application tailored to provide consumers and shoppers across Bangladesh with transparent, real-time insights into market prices for essential commodities, including rice, pulses, oil, vegetables, fish, and meat.

---

## 🌐 Live Demo

- **Live URL:** [https://frontend-project-with-authentication-bazar-dor.vercel.app](https://frontend-project-with-authentication-bazar-dor.vercel.app)

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Authentication:** [Better Auth](https://better-auth.com/) (Email/Password & Social OAuth)
- **Toast Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Deployment & Hosting:** [Vercel](https://vercel.com/)

---

## ✨ 5 Key Features

1. **Real-time Bengali Price Ticker & Category Navigation**  
   Dynamic marquee-style price ticker showcasing current commodity rates alongside percentage changes, paired with an active-state pill navigation bar.

2. **Accurate Numeric Bengali Price Sorting**  
   Intelligent price sorting mechanism (`দাম: কম থেকে বেশি` and `দাম: বেশি থেকে কম`) operating on actual numerical values rather than raw Bengali character strings.

3. **Protected Route Shielding with Contextual Toasts**  
   Server-side Next.js route proxy protecting sensitive routes (e.g., `/profile`), redirecting unauthenticated users to sign-in while triggering immediate feedback toasts.

4. **User Profile & Account Information Management**  
   Secure authentication session handling with dedicated capabilities for authenticated users to modify and update their profile details.

5. **Optimized UX with Skeleton Placeholders & Custom 404**  
   Shimmer skeleton loaders displayed during product data hydration across Home and Category pages, coupled with a localized friendly 404 not-found screen.

---

## 🚀 Getting Started Locally

Follow these steps to run the application in your local environment:

### 1. Clone the Repository

```bash
git clone https://github.com/maksudulhasanlimon-1857/frontend-project-with-authentication-bazar-dor-ggt4.git
cd frontend-project-with-authentication-bazar-dor-ggt4
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
BETTER_AUTH_SECRET=your_super_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 📱 Responsive Design

Fully optimized for modern viewports—supporting mobile devices, tablets, and wide desktop screens through dynamic CSS Grid breakdowns and accessible UI containers.


