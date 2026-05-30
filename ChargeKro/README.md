# ⚡ ChargeKro — GST Invoice Platform

<p align="center">
  <strong>A free, open-source GST Invoice Generator for Indian businesses.</strong><br/>
  Works for Gyms, Salons, Restaurants, IT Consulting, Freelancers, Retail, Clinics & more.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-India%20🇮🇳-orange" />
  <img src="https://img.shields.io/badge/GST-Compliant-green" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" />
</p>

---

## 🎯 What is ChargeKro?

ChargeKro is a **multi-business GST invoice platform** that lets any Indian business create professional, GST-compliant tax invoices in seconds. No signup needed. No server required. Runs entirely in your browser.

### ✨ Key Features

- 🏢 **Multi-Business Support** — Manage unlimited businesses from one app
- 🧾 **GST-Compliant Invoices** — Auto CGST+SGST (intra-state) or IGST (inter-state)
- 🏭 **10 Industry Templates** — Pre-loaded SAC/HSN codes & GST rates
- 👥 **Client Management** — Save clients with GSTIN for B2B invoices
- 🖼️ **Logo Upload** — Upload your business logo to print on invoices
- 🖨️ **Print / Save PDF** — Professional invoice layout, print-ready
- 💬 **WhatsApp Sharing** — Send invoice summary to client via WhatsApp
- 🔢 **Auto Invoice Numbering** — Configurable prefix + financial year
- 💰 **Amount in Words** — Indian numbering system (lakhs/crores)
- 📊 **Dashboard** — Revenue, GST collected, invoice & client counts
- 💾 **Persistent Storage** — All data saved across sessions
- 🌙 **Beautiful UI** — Navy Blue + Amber Gold theme

### 🏭 Supported Industries

| Industry | SAC/HSN Codes | Default GST |
|----------|--------------|-------------|
| Gym & Fitness | 999312, 997212 | 18% |
| Salon & Spa | 999712 | 18% |
| Restaurant & Café | 996331, 996335 | 5-18% |
| IT & Consulting | 998314, 998312 | 18% |
| Freelancer | 998391, 998386 | 18% |
| Retail / Shop | Various HSN | 5-18% |
| Clinic / Hospital | 999312 | 18% |
| Coaching / Tuition | 999293 | 18% |
| Real Estate / Rental | 997212 | 18% |
| Custom / Other | Configurable | Any |

---

## 🚀 Quick Start

### Option 1: Run Locally (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/chargekro.git
cd chargekro

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser. That's it!

### Option 2: Deploy Free on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/chargekro)

### Option 3: Deploy Free on Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/chargekro)

---

## 📁 Project Structure

```
chargekro/
├── public/
│   └── favicon.svg          # App icon
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Base styles
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── vite.config.js           # Vite configuration
├── LICENSE                  # MIT License
└── README.md                # This file
```

---

## 🛠️ How to Use

### 1. Choose Your Industry
Select from 10 industry templates — each comes pre-loaded with correct SAC/HSN codes and GST rates.

### 2. Set Up Your Business
Enter your business name, address, GSTIN, bank details, and upload your logo.

### 3. Add Clients
Add your customers with their details. Optionally add GSTIN for B2B invoices.

### 4. Create Invoice
Pick a client, add services/products, and the app auto-calculates GST (CGST+SGST or IGST based on state).

### 5. Share
Print the invoice, save as PDF, or share via WhatsApp — all in one click.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Feature Ideas
- [ ] Payment tracking (paid / unpaid / partial)
- [ ] Recurring invoices
- [ ] Expense tracker + GST input credit
- [ ] Razorpay payment links
- [ ] Excel/CSV export for CA filing
- [ ] Multi-user login
- [ ] UPI QR code on invoices
- [ ] Digital signature upload
- [ ] Email invoice as PDF attachment
- [ ] PWA support (installable app)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

Built with ❤️ in India using:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Google Fonts](https://fonts.google.com/) (Righteous + Outfit)

---

<p align="center">
  <strong>⚡ ChargeKro — Invoice Karo, Charge Karo!</strong><br/>
  If you find this useful, please ⭐ star the repo!
</p>
