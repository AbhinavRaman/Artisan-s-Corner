# Artisan's Corner - UI/UX Improvements & Payment Integration

## Overview

This document outlines the recent UI/UX enhancements and Razorpay payment integration implemented in the Artisan's Corner e-commerce platform.

## 🎨 UI/UX Improvements

### Dark Mode Feature

- **DarkModeContext**: Global context for managing dark mode state
  - Located in: `src/context/DarkModeContext.jsx`
  - Persists user preference in localStorage
  - Automatically applies/removes dark class to document root

- **Toggle Button**: Dark mode toggle available in navbar (🌙/☀️ button)
  - Smooth transitions between light and dark modes
  - Accessible to all users on every page

### Minimalistic Design System

- **Theme Utility**: Centralized styling with `src/utils/theme.js`
  - Predefined Tailwind class combinations for consistency
  - Easy to maintain and update design system
  - Covers backgrounds, text colors, borders, cards, inputs, and buttons

- **Global Styles**: Updated `src/index.css`
  - Minimalist, clean aesthetic
  - Proper contrast ratios for accessibility
  - Smooth transitions and hover effects
  - Responsive design patterns

### Updated Components & Pages

1. **Navbar** (`src/components/Navbar.jsx`)
   - Dark mode toggle button
   - Minimalist design with indigo color scheme
   - Responsive layout with proper spacing

2. **Home** (`src/pages/Home.jsx`)
   - Clean product grid layout
   - Proper typography and spacing
   - Dark mode support

3. **Login** (`src/pages/Login.jsx`)
   - Centered card layout
   - Error message display
   - Dark mode responsive

4. **Register** (`src/pages/Register.jsx`)
   - Similar to login for consistency
   - Role selection dropdown
   - Account type guidance

5. **Profile** (`src/pages/Profile.jsx`)
   - Two-column grid layout
   - Personal info and password change sections
   - Better organization and UX

6. **Cart** (`src/pages/Cart.jsx`)
   - Product cards in cart
   - Sticky order summary sidebar
   - Clean item management

7. **Checkout** (`src/pages/Checkout.jsx`)
   - Multi-step form with shipping address
   - Payment form integration
   - Order summary panel

## 💳 Razorpay Payment Integration

### Frontend Implementation

- **PaymentForm Component** (`src/components/PaymentForm.jsx`)
  - Integrates Razorpay Checkout
  - Opens Razorpay modal for secure payment
  - Handles success callback and verifies payment on backend
  - Demo/test mode supported via Razorpay test keys

### Backend Implementation

- **Razorpay Order Endpoint** (`/api/orders/create-razorpay-order`)
  - Creates Razorpay order (amount in paise)
  - Returns order id and details to frontend for Checkout
  - Frontend uses Razorpay Checkout with `order_id`

- **Payment Verification Endpoint** (`/api/orders/verify-payment`)
  - Verifies Razorpay signature using `RAZORPAY_KEY_SECRET`
  - On successful verification, creates the application order and marks `isPaid=true`

- **Order Controller Updates** (`controllers/orderController.js`)
  - `createRazorpayOrder()`: Creates Razorpay order
  - `verifyAndCreateOrder()`: Verifies payment signature and creates the order

- **Order Model Updates** (`models/Order.js`)
  - Added `paymentIntentId` field
  - Tracks payment status with existing `isPaid` field
  - Maintains payment audit trail

### Checkout Flow (Razorpay)

1. User fills shipping address
2. User clicks Pay → frontend requests a Razorpay `order` from backend
3. Razorpay Checkout modal opens with `order_id`
4. User completes payment in modal
5. Razorpay returns `payment_id` + `signature` to frontend
6. Frontend sends those to backend `/orders/verify-payment` with cart + shipping
7. Backend verifies signature and creates application `Order` (isPaid=true)
8. User redirected to order success page

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/artisanDB
JWT_SECRET=artisanssecretkey123
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=rzp_test_YOUR_KEY_SECRET
NODE_ENV=development
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

### Getting Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Create or view `Key ID` and `Key Secret`
5. Add them to respective `.env` files

### Test Mode

Razorpay provides a test mode. Use your test `Key ID`/`Key Secret` and the Razorpay Checkout will allow testing with sandbox cards and flows. See Razorpay docs for test card numbers and scenarios.

## 📦 Dependencies

### Frontend
```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.9.6",
  "tailwindcss": "^4.1.17"
}
```

### Backend
```json
{
  "razorpay": "^2.8.0",
  "express": "^5.1.0",
  "mongoose": "^8.20.0",
  "dotenv": "^17.2.3"
}
```

## 🔒 Security Considerations

### .gitignore Updates
- All `.env` files are ignored
- Lock files (package-lock.json, yarn.lock)
- Node modules and build outputs
- Database files
- IDE and editor configurations
- OS-specific files

### Best Practices
- Never commit actual Stripe keys to repository
- Use `.env.example` as template for developers
- Validate all payments on backend
- Use HTTPS in production
- Implement rate limiting on payment endpoints

## 🚀 Getting Started

### Installation

1. **Backend Setup**
```bash
cd Artisan-Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

2. **Frontend Setup**
```bash
cd Artisan-Frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Running the Application

- Frontend: http://localhost:5173 (or as shown by Vite)
- Backend: http://localhost:5000

## 📝 File Structure

### Created Files
- `src/context/DarkModeContext.jsx` - Dark mode context provider
- `src/utils/theme.js` - Centralized theme utility
- `src/components/PaymentForm.jsx` - Payment form component
- `.env.example` (both backend and frontend) - Environment variables template

### Modified Files
- `src/index.css` - Global styles for dark mode
- `src/main.jsx` - Added DarkModeProvider
- `src/components/Navbar.jsx` - Dark mode toggle
- `src/pages/Home.jsx` - Dark mode support
- `src/pages/Login.jsx` - Dark mode support
- `src/pages/Register.jsx` - Dark mode support
- `src/pages/Profile.jsx` - Dark mode support
- `src/pages/Cart.jsx` - Dark mode support
- `src/pages/Checkout.jsx` - Payment integration
- `controllers/orderController.js` - Stripe payment intent
- `routes/orderRoutes.js` - Payment endpoint
- `models/Order.js` - Payment intent field
- `.env` - Stripe configuration
- `.gitignore` - Enhanced security

## 🔧 Future Enhancements

- [ ] Complete Razorpay integration notes: webhooks & server-side verification
- [ ] Payment confirmation webhook handling
- [ ] Multiple payment methods (Apple Pay, Google Pay, etc.)
- [ ] Order tracking and notifications
- [ ] Invoice generation
- [ ] Refund management
- [ ] Analytics dashboard

## 📞 Support

For issues or questions:
1. Check the Stripe documentation: https://stripe.com/docs
2. Review the environment setup
3. Verify API keys are correct
4. Check browser console for errors
5. Check server logs for backend errors

## 📄 License

Artisan's Corner - All Rights Reserved
