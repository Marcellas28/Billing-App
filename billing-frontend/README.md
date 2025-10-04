🧾 Billing Application with SMS & Thermal Printing
A full-stack billing application built with React.js frontend and Node.js backend that allows users to create bills, send SMS receipts to customers, and print receipts using thermal printers.

✨ Features
📱 Modern React UI - Clean, responsive interface for bill management

🧾 Receipt Generation - Automatic receipt formatting for thermal printers

📧 SMS Integration - Send receipts directly to customer phones via Twilio

🖨️ Thermal Printing - Support for USB and network thermal printers

💰 Real-time Calculations - Automatic tax and total calculations

🎨 Custom Branding - Personalized with "Marcellas Did It" branding

📊 Bill Management - Track and manage all created bills

🔄 RESTful API - Well-structured backend API with Express.js

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB (v4.4 or higher)

A thermal printer (optional for development)

Installation
Clone the repository

bash
git clone https://github.com/Marcellas28/billing-app.git
cd billing-app
Setup Backend

bash
cd billing-backend
npm install
Setup Frontend

bash
cd ../billing-frontend
npm install
Configuration
Backend Environment Variables
Create billing-backend/.env:

env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/billing-app

# Twilio SMS (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Printer Configuration
PRINTER_TYPE=usb # or 'network'
PRINTER_VENDOR_ID=0x0416
PRINTER_PRODUCT_ID=0x5011
NETWORK_PRINTER_IP=192.168.1.100
NETWORK_PRINTER_PORT=9100

JWT_SECRET=your_jwt_secret_key
Frontend Configuration
Update API base URL in billing-frontend/src/services/api.ts if needed:

typescript
const API_BASE_URL = 'http://localhost:5000/api';
🏃‍♂️ Running the Application
Development Mode
Start the Backend Server

bash
cd billing-backend
npm run dev
Backend will run on: http://localhost:5000

Start the Frontend Development Server

bash
cd billing-frontend
npm start
Frontend will run on: http://localhost:3000

Production Build
Build Frontend

bash
cd billing-frontend
npm run build
Start Production Server

bash
cd billing-backend
npm start
📁 Project Structure
text
billing-app/
├── billing-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── types/            # TypeScript type definitions
│   │   ├── services/         # API services
│   │   └── App.tsx          # Main App component
│   ├── public/              # Static files
│   └── package.json
├── billing-backend/           # Node.js Backend
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
🛠️ API Endpoints
Bills
POST /api/bills - Create a new bill

GET /api/bills - Get all bills

GET /api/bills/:id - Get a specific bill

POST /api/bills/:id/sms - Send SMS receipt

POST /api/bills/:id/print - Print receipt

Health Check
GET /api/health - API health status

🖨️ Printer Setup
USB Thermal Printer
Connect your thermal printer via USB

Install necessary drivers

Update printer vendor and product IDs in .env

Test with: POST /api/bills/:id/print

Network Thermal Printer
Connect printer to the same network

Update IP and port in .env

Test connectivity

📱 SMS Setup (Twilio)
Create a Twilio account at twilio.com

Get your Account SID and Auth Token

Purchase a phone number

Add credentials to .env file

🧪 Testing with Postman
Import the following collection to Postman:

json
{
  "info": {
    "name": "Billing App API",
    "description": "API collection for Billing Application"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    },
    {
      "name": "Create Bill",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/bills",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"items\": [\n    {\n      \"name\": \"Laptop\",\n      \"quantity\": 1,\n      \"price\": 999.99\n    },\n    {\n      \"name\": \"Mouse\", \n      \"quantity\": 2,\n      \"price\": 25.50\n    }\n  ],\n  \"customerPhone\": \"+254712345678\",\n  \"subtotal\": 1050.99,\n  \"tax\": 168.16,\n  \"total\": 1219.15\n}"
        }
      }
    }
  ]
}
🐛 Troubleshooting
Common Issues
MongoDB Connection Error

Ensure MongoDB is running

Check connection string in .env

CORS Errors

Verify backend CORS configuration

Check frontend API URL

Printer Not Found

Verify printer connection

Check vendor and product IDs

Test with simulated printing first

SMS Not Sending

Verify Twilio credentials

Check account balance

Validate phone number format

Development Tips
Use npm run dev for auto-restart during development

Check browser console for frontend errors

Monitor backend terminal for API logs

Use Postman for API testing

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

📝 License
This project is licensed under the MIT License 

👨‍💻 Author
Marcellas

GitHub: @yourusername

Project: Billing App

🙏 Acknowledgments
React.js team for the amazing frontend framework

Express.js for the robust backend framework

MongoDB for the flexible database solution

Twilio for SMS integration capabilities

<div align="center">
Built with ❤️ by Marcellas

"Marcellas Did It"

</div>
📞 Supportt