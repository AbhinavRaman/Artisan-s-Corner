# 🚀 Quick Start Guide

## Setup in 5 Minutes

### Step 1: Get Razorpay Keys (2 min)
1. Go to https://dashboard.razorpay.com
2. Sign in and navigate to Settings → API Keys
3. Create/view `Key ID` and `Key Secret` (test keys for sandbox)

### Step 2: Configure Environment

**Backend** - Edit `Artisan-Backend/.env`:
```
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=rzp_test_YOUR_KEY_HERE
```

**Frontend** - Edit `Artisan-Frontend/.env`:
```
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd Artisan-Backend
npm install  # if needed
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Artisan-Frontend
npm install  # if needed
npm run dev
```

### Step 4: Test Features

**Dark Mode:**
- Look for 🌙/☀️ button in top-right navbar
- Click to toggle dark/light mode
- Refresh page - your choice is saved!

**Payment (Razorpay):**
- Add item to cart
- Go to Checkout
- Fill shipping address
- Click "Pay" to open Razorpay Checkout modal
- Complete payment in the modal (use Razorpay test keys for sandbox flows)

---

## 📂 Key Files Reference

| Task | File |
|------|------|
| Dark Mode Logic | `src/context/DarkModeContext.jsx` |
| Design System | `src/utils/theme.js` |
| Dark Mode Toggle | `src/components/Navbar.jsx` |
| Payment Form | `src/components/PaymentForm.jsx` |
| Payment Endpoint | `controllers/orderController.js` |
| Global Styles | `src/index.css` |
| Setup Guide | `IMPLEMENTATION_GUIDE.md` |
| Full Summary | `COMPLETION_SUMMARY.md` |

---

## 🔑 Razorpay Test Mode

Razorpay uses test keys for sandbox mode. Use the test `Key ID`/`Key Secret` in your `.env` files and run through the Checkout flow — the Razorpay modal provides the sandbox testing experience. See Razorpay docs for specific test card numbers and flows.

---

## 🎨 Customize Colors

Edit `src/utils/theme.js`:
```javascript
// Change primary color from indigo to your choice
// buttonPrimary, buttonSecondary, etc.
```

Edit `src/index.css`:
```css
/* Change CSS custom properties */
@apply bg-[YOUR_COLOR] text-[YOUR_COLOR];
```

---

## 🆘 Troubleshooting

**Dark Mode Not Working:**
- Clear browser cache
- Check DarkModeProvider in main.jsx
- Open DevTools console for errors

**Payment Form Not Showing:**
- Verify Razorpay keys are set in `Artisan-Backend/.env` and `Artisan-Frontend/.env`
- Check backend is running on port 5000
- Verify `VITE_API_URL` / API_URL is correct

**Styles Not Applying:**
- Ensure Tailwind CSS is running
- Clear `dist/` folder
- Restart dev server

---

## 📞 Quick Support

1. **Error in Console?** → Check browser DevTools
2. **Backend Issues?** → Check terminal for errors
3. **Stripe Problems?** → Verify API keys
4. **Styling Issues?** → Check theme.js and index.css

---

## ✨ What's New

✅ **Dark Mode** - Toggle 🌙/☀️ in navbar  
✅ **Minimalist Design** - Clean, modern UI  
✅ **Payment Form** - Ready for Stripe  
✅ **Better Checkout** - Improved UX  

---

## 🎯 Next: Production Setup

When ready to go live:

1. Get production Razorpay keys from dashboard
2. Update `.env` with production keys
3. Set `NODE_ENV=production`
4. Deploy backend and frontend
5. Test with real card details

---

**Need Help?** See `IMPLEMENTATION_GUIDE.md` for complete documentation.
